from flask import Blueprint

bp = Blueprint('movie', __name__, url_prefix='')

from .import routes