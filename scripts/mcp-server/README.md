# Claude Task Master MCP Server

A task management server that uses task-master-ai for task processing.

## Installation

1. Navigate to the mcp-server directory:
```bash
cd scripts/mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Update the `config.json` file with your API keys:
```json
{
  "mcpServers": {
    "taskmaster-ai": {
      "command": "npx",
      "args": ["-y", "--package=task-master-ai", "task-master-ai"],
      "env": {
        "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE",
        "PERPLEXITY_API_KEY": "YOUR_PERPLEXITY_API_KEY_HERE",
        "MODEL": "claude-3-7-sonnet-20250219",
        "PERPLEXITY_MODEL": "sonar-pro",
        "MAX_TOKENS": 64000,
        "TEMPERATURE": 0.2,
        "DEFAULT_SUBTASKS": 5,
        "DEFAULT_PRIORITY": "medium"
      }
    }
  }
}
```

## Usage

1. Start the server:
```bash
npm start
```

## Configuration

The server can be configured by modifying the `config.json` file. Key settings include:

- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `PERPLEXITY_API_KEY`: Your Perplexity API key
- `MODEL`: The Claude model to use
- `PERPLEXITY_MODEL`: The Perplexity model to use
- `MAX_TOKENS`: Maximum tokens for responses
- `TEMPERATURE`: Response temperature (0.0 to 1.0)
- `DEFAULT_SUBTASKS`: Default number of subtasks to generate
- `DEFAULT_PRIORITY`: Default priority for tasks

## API Endpoints

### POST /api/tasks
Submit a task for processing.

Request body:
```json
{
  "task": "Your task description",
  "context": "Additional context for the task"
}
```

### GET /health
Check server health status. 