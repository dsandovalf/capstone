from flask import Flask, send_from_directory
from config import Config 
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate 
from flask_moment import Moment
# from flask_cors import CORS

login = LoginManager()
login.login_view = 'auth.login'

db = SQLAlchemy()
migrate = Migrate()
moment = Moment()
# cors = CORS()

def create_app(config_class=Config):
    app = Flask(__name__, static_folder="../client/build", static_url_path='')
    app.config.from_object(config_class)
    login.init_app(app)    
    db.init_app(app)
    migrate.init_app(app,db)
    moment.init_app(app)
    # cors.init_app(app)

    @app.route('/')
    def serve():
        return send_from_directory(app.static_folder,'index.html')

    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file('index.html')

    from .blueprints.auth import bp as auth_bp
    app.register_blueprint(auth_bp)

    from .blueprints.movie import bp as movie_bp
    app.register_blueprint(movie_bp)

    from .blueprints.api import bp as api_bp
    app.register_blueprint(api_bp)

    return app