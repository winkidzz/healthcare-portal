#!/bin/bash

# Configuration
SERVICE_NAME="preferences-service"
PORT=8080
MFE_PORT=3002
LOG_FILE="service.log"
PID_FILE="service.pid"
MFE_PID_FILE="mfe.pid"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    local port=$1
    if command -v lsof >/dev/null 2>&1; then
        lsof -i :$port >/dev/null 2>&1
    else
        netstat -an | grep -q ":$port .*LISTEN"
    fi
}

# Function to kill existing process on a port
kill_existing_process() {
    local port=$1
    local pid_file=$2
    echo -e "${YELLOW}Checking for existing process on port $port...${NC}"
    
    if check_port $port; then
        echo -e "${YELLOW}Found process using port $port. Attempting to stop...${NC}"
        
        # Try to get PID from PID file first
        if [ -f "$pid_file" ]; then
            local pid=$(cat "$pid_file")
            if [ -n "$pid" ] && ps -p $pid > /dev/null; then
                echo -e "${YELLOW}Stopping process with PID $pid...${NC}"
                kill $pid
                sleep 2
                if ps -p $pid > /dev/null; then
                    echo -e "${YELLOW}Process still running, forcing termination...${NC}"
                    kill -9 $pid
                fi
            fi
            rm -f "$pid_file"
        fi
        
        # If still running, try to find and kill by port
        if check_port $port; then
            if command -v lsof >/dev/null 2>&1; then
                local pid=$(lsof -ti:$port)
                if [ -n "$pid" ]; then
                    echo -e "${YELLOW}Stopping process with PID $pid (found by port)...${NC}"
                    kill $pid
                    sleep 2
                    if ps -p $pid > /dev/null; then
                        kill -9 $pid
                    fi
                fi
            fi
        fi
        
        # Verify process is stopped
        if check_port $port; then
            echo -e "${RED}Failed to stop process on port $port${NC}"
            return 1
        else
            echo -e "${GREEN}Successfully stopped process on port $port${NC}"
        fi
    else
        echo -e "${GREEN}No process found on port $port${NC}"
    fi
    return 0
}

start() {
    echo -e "${YELLOW}Starting $SERVICE_NAME...${NC}"
    
    # First ensure no existing process is running on either port
    kill_existing_process $PORT $PID_FILE
    kill_existing_process $MFE_PORT $MFE_PID_FILE
    
    # Start Spring Boot service
    echo -e "${YELLOW}Starting Spring Boot service...${NC}"
    mvn spring-boot:run > "$LOG_FILE" 2>&1 &
    SPRING_PID=$!
    echo $SPRING_PID > "$PID_FILE"
    
    # Wait for Spring Boot to start
    echo -e "${YELLOW}Waiting for Spring Boot service to start...${NC}"
    for i in {1..30}; do
        if check_port $PORT; then
            echo -e "${GREEN}Spring Boot service started successfully${NC}"
            break
        fi
        if [ $i -eq 30 ]; then
            echo -e "${RED}Spring Boot service failed to start within 30 seconds${NC}"
            stop
            return 1
        fi
        sleep 1
    done
    
    # Start MFE
    echo -e "${YELLOW}Starting MFE...${NC}"
    cd ../../apps/preferences-mfe
    npm run dev > "../$LOG_FILE" 2>&1 &
    MFE_PID=$!
    echo $MFE_PID > "../$MFE_PID_FILE"
    cd - > /dev/null
    
    # Wait for MFE to start
    echo -e "${YELLOW}Waiting for MFE to start...${NC}"
    for i in {1..30}; do
        if check_port $MFE_PORT; then
            echo -e "${GREEN}MFE started successfully${NC}"
            echo -e "${GREEN}Service is up and running!${NC}"
            echo -e "${YELLOW}Spring Boot service PID: $SPRING_PID${NC}"
            echo -e "${YELLOW}MFE PID: $MFE_PID${NC}"
            echo -e "${YELLOW}Logs available in $LOG_FILE${NC}"
            return 0
        fi
        if [ $i -eq 30 ]; then
            echo -e "${RED}MFE failed to start within 30 seconds${NC}"
            stop
            return 1
        fi
        sleep 1
    done
}

stop() {
    echo -e "${YELLOW}Stopping $SERVICE_NAME...${NC}"
    
    # Stop MFE first
    if [ -f "$MFE_PID_FILE" ]; then
        MFE_PID=$(cat "$MFE_PID_FILE")
        if [ -n "$MFE_PID" ] && ps -p $MFE_PID > /dev/null; then
            echo -e "${YELLOW}Stopping MFE (PID: $MFE_PID)...${NC}"
            kill $MFE_PID
            sleep 2
            if ps -p $MFE_PID > /dev/null; then
                kill -9 $MFE_PID
            fi
        fi
        rm -f "$MFE_PID_FILE"
    fi
    
    # Stop Spring Boot service
    if [ -f "$PID_FILE" ]; then
        SPRING_PID=$(cat "$PID_FILE")
        if [ -n "$SPRING_PID" ] && ps -p $SPRING_PID > /dev/null; then
            echo -e "${YELLOW}Stopping Spring Boot service (PID: $SPRING_PID)...${NC}"
            kill $SPRING_PID
            sleep 2
            if ps -p $SPRING_PID > /dev/null; then
                kill -9 $SPRING_PID
            fi
        fi
        rm -f "$PID_FILE"
    fi
    
    # Verify both ports are free
    if ! check_port $PORT && ! check_port $MFE_PORT; then
        echo -e "${GREEN}Service stopped successfully${NC}"
    else
        echo -e "${RED}Failed to stop all processes${NC}"
        return 1
    fi
}

status() {
    if check_port $PORT; then
        if [ -f "$PID_FILE" ]; then
            SPRING_PID=$(cat "$PID_FILE")
            echo -e "${GREEN}Spring Boot service is running on port $PORT with PID $SPRING_PID${NC}"
        else
            echo -e "${YELLOW}Spring Boot service is running on port $PORT but PID file is missing${NC}"
        fi
    else
        echo -e "${RED}Spring Boot service is not running${NC}"
    fi
    
    if check_port $MFE_PORT; then
        if [ -f "$MFE_PID_FILE" ]; then
            MFE_PID=$(cat "$MFE_PID_FILE")
            echo -e "${GREEN}MFE is running on port $MFE_PORT with PID $MFE_PID${NC}"
        else
            echo -e "${YELLOW}MFE is running on port $MFE_PORT but PID file is missing${NC}"
        fi
    else
        echo -e "${RED}MFE is not running${NC}"
    fi
}

restart() {
    stop
    sleep 2
    start
}

# Main script
case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    status)
        status
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac

exit 0 