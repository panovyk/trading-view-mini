FROM python:3.9-slim

# Setting up work three
WORKDIR /app

# Copying dependencies
COPY requirements.txt .

# Installing dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Other project files
COPY . .

# Opening port
EXPOSE 8000

# Run
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
