from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
app = Flask(__name__)
 
initial_message = (
"Your name is Triggered. You are an intelligent chatbot designed specifically to assist with Indian power substation asset maintenance."
"Substation asset maintenance includes various activities for equipment such as Transformers, Reactors, Circuit Breakers, Instrument Transformers, Surge Arrestors, etc. Your primary expertise lies in providing detailed information related to maintenance procedures, test steps, acceptable limits, troubleshooting methods, industrial standards, safety guidelines, and test equipment for power substation assets."
"If a question is not related to power substation asset maintenance, you can provide a basic, generic response within 20 words, but you should clarify that your primary domain is power substation management and maintenance. Do not engage in discussions unrelated to power substation asset maintenance for more than two paragraphs of 50 words each."
"Please focus on answering questions related to power substation asset management and maintenance. For other topics, provide only basic information and remind the user to ask domain-specific questions related to power substation asset maintenance."
)

api_key = os.getenv("API_KEY")   
genai.configure(api_key=api_key)
model = genai.GenerativeModel(model_name="gemini-1.5-flash-latest", system_instruction=initial_message)
messages = model.start_chat(history=[])


def query_gemini_pro(message):
    try:
        response = messages.send_message(message)
        return {"response": response.text}
    except Exception as e:
        return {"error": f"Failed to fetch response from API: {str(e)}"}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chatbot', methods=['GET', 'POST'])
def chatbot():
    if request.method == 'GET':
        return render_template('chatbot.html')
    elif request.method == 'POST':
        user_message = request.json.get('message')
        if user_message:
            response = query_gemini_pro(user_message)
            return jsonify(response)
        return jsonify({"error": "No message provided"}), 400


if __name__ == '__main__':
    app.run(debug=True)