import os
import json
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# Directory and file setup
user_data_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'user_data')
if not os.path.exists(user_data_dir):
    os.makedirs(user_data_dir)
user_store_path = os.path.join(user_data_dir, 'users.json')

# Helper to load/save users
def load_users():
    if not os.path.exists(user_store_path):
        return []
    with open(user_store_path, 'r', encoding='utf-8') as f:
        try:
            return json.load(f)
        except Exception:
            return []

def save_users(users):
    with open(user_store_path, 'w', encoding='utf-8') as f:
        json.dump(users, f, indent=2)

# --- API Endpoints ---

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not username or not email or not password:
        return jsonify({'success': False, 'error': 'All fields required'}), 400

    users = load_users()
    if any(u['email'] == email or u['username'] == username for u in users):
        return jsonify({'success': False, 'error': 'User already exists'}), 409

    hashed_pw = generate_password_hash(password)
    user = {
        'username': username,
        'email': email,
        'password': hashed_pw
    }
    users.append(user)
    save_users(users)
    return jsonify({'success': True, 'message': 'Registration successful'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    identifier = data.get('identifier')
    password = data.get('password')
    if not identifier or not password:
        return jsonify({'success': False, 'error': 'All fields required'}), 400

    users = load_users()
    user = next((u for u in users if u['email'] == identifier or u['username'] == identifier), None)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'success': False, 'error': 'Invalid credentials'}), 401

    # You can add session logic here if needed
    return jsonify({'success': True, 'username': user['username'], 'email': user['email']})

# --- Add more endpoints for events, etc. as needed ---

if __name__ == '__main__':
    app.run(debug=True)