from flask import Flask
from routes.home import homeBP

app = Flask(__name__)
app.config['SECRET_KEY'] = 'THISISABADKEY'
app.register_blueprint(homeBP)
app.run(debug = True)