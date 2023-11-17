from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Фейковые данные (замените на реальные данные из вашей базы данных или другого источника)
fake_data = [
    {"id": 1, "name": "John Doe", "email": "john@example.com"},
    {"id": 2, "name": "Jane Doe", "email": "jane@example.com"},
    # Дополнительные данные...
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/load_data/<int:page>')
def load_data(page):
    items_per_page = 10
    start_index = (page - 1) * items_per_page
    end_index = start_index + items_per_page
    page_data = fake_data[start_index:end_index]
    return jsonify({'data': page_data})

if __name__ == '__main__':
    app.run(debug=True)
