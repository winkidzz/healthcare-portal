#!/bin/bash

# Function to cleanup processes
cleanup() {
  echo "Cleaning up..."
  if [ ! -z "$PREFERENCES_PID" ]; then
    kill $PREFERENCES_PID 2>/dev/null || true
  fi
  if [ ! -z "$HOST_PID" ]; then
    kill $HOST_PID 2>/dev/null || true
  fi
  lsof -ti:3000 | xargs kill -9 2>/dev/null || true
  lsof -ti:3002 | xargs kill -9 2>/dev/null || true
}

# Set up cleanup on script exit
trap cleanup EXIT

# Create logs directory if it doesn't exist
mkdir -p logs

# Kill any existing processes on ports 3000 and 3002
echo "Killing existing processes on ports 3000 and 3002..."
cleanup

# Start the preferences MFE
echo "Starting preferences MFE..."
cd apps/preferences-mfe
npm run build
if [ $? -ne 0 ]; then
  echo "Preferences MFE build failed"
  exit 1
fi

PORT=3002 npm run dev > ../../logs/preferences-mfe.log 2>&1 &
PREFERENCES_PID=$!

# Wait for preferences MFE to start
echo "Waiting for preferences MFE to start..."
COUNTER=0
until curl -s http://localhost:3002 > /dev/null || [ $COUNTER -eq 30 ]; do
  sleep 1
  let COUNTER=COUNTER+1
done

if [ $COUNTER -eq 30 ]; then
  echo "Preferences MFE failed to start"
  cat ../../logs/preferences-mfe.log
  exit 1
fi

# Start the host app
echo "Starting host app..."
cd ../host-app
npm run build
if [ $? -ne 0 ]; then
  echo "Host app build failed"
  exit 1
fi

npm run dev > ../../logs/host-app.log 2>&1 &
HOST_PID=$!

# Wait for host app to start
echo "Waiting for host app to start..."
COUNTER=0
until curl -s http://localhost:3000 > /dev/null || [ $COUNTER -eq 30 ]; do
  sleep 1
  let COUNTER=COUNTER+1
done

if [ $COUNTER -eq 30 ]; then
  echo "Host app failed to start"
  cat ../../logs/host-app.log
  exit 1
fi

# Run the tests
echo "Running tests..."
npm run test

# Check test results
TEST_RESULT=$?
if [ $TEST_RESULT -ne 0 ]; then
  echo "Tests failed. Displaying logs:"
  echo "=== Host App Logs ==="
  cat ../../logs/host-app.log
  echo "=== Preferences MFE Logs ==="
  cat ../../logs/preferences-mfe.log
  exit $TEST_RESULT
fi 