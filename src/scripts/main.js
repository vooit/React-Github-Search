import React from 'react';
import ReactDOM from 'react-dom';

import SearchInput from './SearchInput';
import SearchCard from './SearchCard';

import '../styles/styles.scss';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';

const API = 'https://api.github.com/users';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'vooit',
            name:'',
            avatar:'',
            location:'',
            repos:'',
            followers: '',
            following:'',
            homeUrl:'',
            notFound:''
        }
    }
    fetchProfile(username) {
        let url = `${API}/${username}`;
        fetch(url)
            .then((res) => res.json() )
            .then((data) => {
                this.setState({
                    username: data.login,
                    name: data.name,
                    avatar: data.avatar_url,
                    location: data.location,
                    repos: data.public_repos,
                    followers: data.followers,
                    following: data.following,
                    homeUrl: data.html_url,
                    notFound: data.message
                })
            })
            .catch((error) => console.log('Oops! . There Is A Problem') )
    }
    componentDidMount() {
        this.fetchProfile(this.state.username);
    }
    render() {
        return (
            <div>
                <section id="card">
                    <SearchInput fetchProfile={this.fetchProfile.bind(this)}/>
                    <SearchCard data={this.state} />
                </section>
                <span className="vooit">GitHub Card With ReactJs - Created By <a href="" target="_blank" title="">Vooit</a></span>
            </div>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById('app'));
