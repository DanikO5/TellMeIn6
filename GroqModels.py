import importlib
import sys
import subprocess
import os

def check_install_requests():
    """Check if requests is installed, install if not."""
    try:
        importlib.import_module('requests')
        print("✓ Requests package is already installed.")
        return True
    except ImportError:
        print("Requests package is not installed. Installing now...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
            print("✓ Requests package installed successfully.")
            return True
        except Exception as e:
            print(f"Error installing requests package: {e}")
            return False

def get_api_key():
    """Get API key from environment variable or user input."""
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        api_key = input("Please enter your Groq API key: ").strip()
    if not api_key:
        print("Error: No API key provided.")
        return None
    return api_key

def list_groq_models(api_key):
    """List available Groq models using the provided API key."""
    import requests
    url = "https://api.groq.com/openai/v1/models"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            models = response.json()
            print("\nAvailable Groq models:")
            for model in models.get("data", []):
                print(f"- {model['id']}")
            return True
        else:
            print(f"\nError: {response.status_code}")
            print(response.text)
            return False
    except Exception as e:
        print(f"\nError connecting to Groq API: {e}")
        return False

def main():
    """Main function to run the script."""
    print("Groq Models Checker")
    print("-------------------")
    if not check_install_requests():
        print("Failed to install required packages. Exiting.")
        return
    api_key = get_api_key()
    if not api_key:
        return
    list_groq_models(api_key)

if __name__ == "__main__":
    main()