'use strict';

class Github {
	constructor() {
		this.clientId = 'dbaf6917212a79004c64';
		this.clientSecret = '7df8e13e85321f2c222a528cee3abd3df3b5457c';
	}

	async getUser(userName) {
		const data = await fetch(`https://api.github.com/users/${userName}?client_id=${this.clientId}&client_secret=${this.clientSecret}`);
		return await data.json()
	}
}

class UI {
	constructor() {
		this.profile = document.querySelector('.profile')
	}

	showProfile(user) {
		this.profile.innerHTML = `
		<div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}" alt="avatar">
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div class="repos"></div>`
	}

	showError(message) {
		const div = document.createElement('div');
		div.classList.add('alert alert-danger')
		div.appendChild(document.createTextNode(message));

		const container = document.querySelector('.searchContainer');
		const search = document.querySelector('.search');
		container.insertBefore(div, search)
	}
}

const github = new Github();
const ui = new UI();

const searchUser = document.querySelector('.searchUser')

searchUser.addEventListener('keyup', (event) => {
	const userText = event.target.value;
	if (userText.trim() !== '') {
		github.getUser(userText)
		.then((data) => {
			if (data.message === 'Not Found') {
				ui.showError(data.message);
			} else {
				ui.showProfile(data);
			}
			// console.log(data);
		})
	}
	
})