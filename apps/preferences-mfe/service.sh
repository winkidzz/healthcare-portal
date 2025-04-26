#!/bin/bash

# Configuration
APP_NAME="preferences-mfe"
PORT=3002
LOG_FILE="mfe.log"
PID_FILE="mfe.pid"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    if command -v lsof >/dev/null 2>&1; then
        lsof -i :$PORT >/dev/null 2>&1
    else
        netstat -an | grep -q ":$PORT .*LISTEN"
    fi
}

# Function to kill existing process on port
kill_existing_process() {
    echo -e "${YELLOW}Checking for existing process on port $PORT...${NC}"
    
    if check_port; then
        echo -e "${YELLOW}Found process using port $PORT. Attempting to stop...${NC}"
        
        # Try to get PID from PID file first
        if [ -f "$PID_FILE" ]; then
            local pid=$(cat "$PID_FILE")
            if [ -n "$pid" ] && ps -p $pid > /dev/null; then
                echo -e "${YELLOW}Stopping process with PID $pid...${NC}"
                kill $pid
                sleep 2
                if ps -p $pid > /dev/null; then
                    echo -e "${YELLOW}Process still running, forcing termination...${NC}"
                    kill -9 $pid
                fi
            fi
            rm -f "$PID_FILE"
        fi
        
        # If still running, try to find and kill by port
        if check_port; then
            if command -v lsof >/dev/null 2>&1; then
                local pid=$(lsof -ti:$PORT)
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
        if check_port; then
            echo -e "${RED}Failed to stop process on port $PORT${NC}"
            return 1
        else
            echo -e "${GREEN}Successfully stopped process on port $PORT${NC}"
        fi
    else
        echo -e "${GREEN}No process found on port $PORT${NC}"
    fi
    return 0
}

start() {
    echo -e "${YELLOW}Starting $APP_NAME...${NC}"
    
    # First ensure no existing process is running
    kill_existing_process
    
    # Install dependencies if needed
    echo -e "${YELLOW}Checking dependencies...${NC}"
    npm install
    
    # Run diagnostics
    echo -e "${YELLOW}Running diagnostics...${NC}"
    npm run diagnose
    
    # Start the application
    echo -e "${YELLOW}Starting Next.js MFE...${NC}"
    npm run dev-mfe > "$LOG_FILE" 2>&1 &
    APP_PID=$!
    echo $APP_PID > "$PID_FILE"
    
    # Wait for application to start
    echo -e "${YELLOW}Waiting for application to start...${NC}"
    for i in {1..30}; do
        if check_port; then
            echo -e "${GREEN}Application started successfully${NC}"
            echo -e "${GREEN}Service is up and running!${NC}"
            echo -e "${YELLOW}PID: $APP_PID${NC}"
            echo -e "${YELLOW}Logs available in $LOG_FILE${NC}"
            return 0
        fi
        if [ $i -eq 30 ]; then
            echo -e "${RED}Application failed to start within 30 seconds${NC}"
            echo -e "${YELLOW}Checking logs for errors...${NC}"
            tail -n 20 "$LOG_FILE"
            stop
            return 1
        fi
        sleep 1
    done
}

stop() {
    echo -e "${YELLOW}Stopping $APP_NAME...${NC}"
    
    if [ -f "$PID_FILE" ]; then
        APP_PID=$(cat "$PID_FILE")
        if [ -n "$APP_PID" ] && ps -p $APP_PID > /dev/null; then
            echo -e "${YELLOW}Stopping application (PID: $APP_PID)...${NC}"
            kill $APP_PID
            sleep 2
            if ps -p $APP_PID > /dev/null; then
                kill -9 $APP_PID
            fi
        fi
        rm -f "$PID_FILE"
    fi
    
    # Verify port is free
    if ! check_port; then
        echo -e "${GREEN}Service stopped successfully${NC}"
    else
        echo -e "${RED}Failed to stop process${NC}"
        return 1
    fi
}

status() {
    if check_port; then
        if [ -f "$PID_FILE" ]; then
            APP_PID=$(cat "$PID_FILE")
            echo -e "${GREEN}Application is running on port $PORT with PID $APP_PID${NC}"
        else
            echo -e "${YELLOW}Application is running on port $PORT but PID file is missing${NC}"
        fi
    else
        echo -e "${RED}Application is not running${NC}"
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