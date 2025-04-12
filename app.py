from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# Replace with your actual OpenAI API key
openai.api_key = "proj_BsLFHB8QuRttxiE22U9bOPEY"

@app.route('/api/second-opinion', methods=['POST'])
def second_opinion():
    try:
        data = request.get_json()
        description = data.get('description')

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert oncologist providing second opinions."},
                {"role": "user", "content": description}
            ]
        )

        result = response['choices'][0]['message']['content']
        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.get_json()
        user_input = data.get('message')

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant guiding users in a cancer care app."},
                {"role": "user", "content": user_input}
            ]
        )

        reply = response['choices'][0]['message']['content']
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
