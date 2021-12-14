from .import bp as movie
from flask import render_template, flash, redirect, url_for, request
from app.models import User
from flask_login import login_required, current_user

@movie.route('/test_login', methods = ['GET', 'POST'])
@login_required
def index():
    if request.method == 'POST':
        return redirect(url_for('movie.index'))
    return render_template('index.html.j2')

