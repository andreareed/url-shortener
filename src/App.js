import React, { Component } from 'react';

class App extends Component {
  state = {
    url: '',
  };

  submitUrl = e => {
    e.preventDefault();
    const { url } = this.state;
    fetch('getShortUrl', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({ url }),
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        <h1>URL Shortener</h1>
        <form onSubmit={this.submitUrl}>
          <input
            value={this.state.url}
            onChange={({ target }) => this.setState({ url: target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
