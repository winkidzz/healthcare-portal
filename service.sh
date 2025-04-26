#!/bin/bash

# Configuration
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SERVICES_DIR="$ROOT_DIR/services"
APPS_DIR="$ROOT_DIR/apps"

# Service configurations
SERVICES=("preferences-service:8080" "preferences-mfe:3002")

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to get service port
get_service_port() {
    local service=$1
    for svc in "${SERVICES[@]}"; do
        if [[ "$svc" == "$service:"* ]]; then
            echo "${svc#*:}"
            return 0
        fi
    done
    return 1
}

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

start_service() {
    local service=$1
    local port=$(get_service_port $service)
    local pid_file="$ROOT_DIR/$service.pid"
    local log_file="$ROOT_DIR/$service.log"
    
    echo -e "${YELLOW}Starting $service...${NC}"
    
    # First ensure no existing process is running
    kill_existing_process $port $pid_file
    
    if [[ $service == *"-mfe" ]]; then
        # Handle Next.js MFE
        cd "$APPS_DIR/$service"
        echo -e "${YELLOW}Installing dependencies...${NC}"
        npm install
        
        echo -e "${YELLOW}Starting Next.js application...${NC}"
        npm run dev > "$log_file" 2>&1 &
        APP_PID=$!
        echo $APP_PID > "$pid_file"
    else
        # Handle Spring Boot service
        cd "$SERVICES_DIR/$service"
        echo -e "${YELLOW}Building service...${NC}"
        mvn clean install
        
        echo -e "${YELLOW}Starting Spring Boot service...${NC}"
        mvn spring-boot:run > "$log_file" 2>&1 &
        APP_PID=$!
        echo $APP_PID > "$pid_file"
    fi
    
    # Wait for service to start
    echo -e "${YELLOW}Waiting for $service to start...${NC}"
    for i in {1..30}; do
        if check_port $port; then
            echo -e "${GREEN}$service started successfully${NC}"
            echo -e "${GREEN}Service is up and running!${NC}"
            echo -e "${YELLOW}PID: $APP_PID${NC}"
            echo -e "${YELLOW}Logs available in $log_file${NC}"
            return 0
        fi
        if [ $i -eq 30 ]; then
            echo -e "${RED}$service failed to start within 30 seconds${NC}"
            echo -e "${YELLOW}Checking logs for errors...${NC}"
            tail -n 20 "$log_file"
            stop_service $service
            return 1
        fi
        sleep 1
    done
}

stop_service() {
    local service=$1
    local port=$(get_service_port $service)
    local pid_file="$ROOT_DIR/$service.pid"
    
    echo -e "${YELLOW}Stopping $service...${NC}"
    
    if [ -f "$pid_file" ]; then
        APP_PID=$(cat "$pid_file")
        if [ -n "$APP_PID" ] && ps -p $APP_PID > /dev/null; then
            echo -e "${YELLOW}Stopping service (PID: $APP_PID)...${NC}"
            kill $APP_PID
            sleep 2
            if ps -p $APP_PID > /dev/null; then
                kill -9 $APP_PID
            fi
        fi
        rm -f "$pid_file"
    fi
    
    # Verify port is free
    if ! check_port $port; then
        echo -e "${GREEN}Service stopped successfully${NC}"
    else
        echo -e "${RED}Failed to stop process${NC}"
        return 1
    fi
}

status_service() {
    local service=$1
    local port=$(get_service_port $service)
    local pid_file="$ROOT_DIR/$service.pid"
    
    if check_port $port; then
        if [ -f "$pid_file" ]; then
            APP_PID=$(cat "$pid_file")
            echo -e "${GREEN}$service is running on port $port with PID $APP_PID${NC}"
        else
            echo -e "${YELLOW}$service is running on port $port but PID file is missing${NC}"
        fi
    else
        echo -e "${RED}$service is not running${NC}"
    fi
}

start() {
    if [ -z "$1" ]; then
        # Start all services
        for svc in "${SERVICES[@]}"; do
            local service="${svc%:*}"
            start_service $service
        done
    else
        # Start specific service
        local port=$(get_service_port $1)
        if [ -n "$port" ]; then
            start_service $1
        else
            echo -e "${RED}Unknown service: $1${NC}"
            echo "Available services:"
            for svc in "${SERVICES[@]}"; do
                echo "  ${svc%:*}"
            done
            return 1
        fi
    fi
}

stop() {
    if [ -z "$1" ]; then
        # Stop all services
        for svc in "${SERVICES[@]}"; do
            local service="${svc%:*}"
            stop_service $service
        done
    else
        # Stop specific service
        local port=$(get_service_port $1)
        if [ -n "$port" ]; then
            stop_service $1
        else
            echo -e "${RED}Unknown service: $1${NC}"
            echo "Available services:"
            for svc in "${SERVICES[@]}"; do
                echo "  ${svc%:*}"
            done
            return 1
        fi
    fi
}

status() {
    if [ -z "$1" ]; then
        # Status of all services
        for svc in "${SERVICES[@]}"; do
            local service="${svc%:*}"
            status_service $service
        done
    else
        # Status of specific service
        local port=$(get_service_port $1)
        if [ -n "$port" ]; then
            status_service $1
        else
            echo -e "${RED}Unknown service: $1${NC}"
            echo "Available services:"
            for svc in "${SERVICES[@]}"; do
                echo "  ${svc%:*}"
            done
            return 1
        fi
    fi
}

restart() {
    if [ -z "$1" ]; then
        # Restart all services
        stop
        sleep 2
        start
    else
        # Restart specific service
        local port=$(get_service_port $1)
        if [ -n "$port" ]; then
            stop_service $1
            sleep 2
            start_service $1
        else
            echo -e "${RED}Unknown service: $1${NC}"
            echo "Available services:"
            for svc in "${SERVICES[@]}"; do
                echo "  ${svc%:*}"
            done
            return 1
        fi
    fi
}

# Main script
case "$1" in
    start)
        start "$2"
        ;;
    stop)
        stop "$2"
        ;;
    restart)
        restart "$2"
        ;;
    status)
        status "$2"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status} [service-name]"
        echo "Available services:"
        for svc in "${SERVICES[@]}"; do
            echo "  ${svc%:*}"
        done
        exit 1
        ;;
esac

exit 0 