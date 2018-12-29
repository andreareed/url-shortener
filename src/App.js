import React, { Component } from 'react';

class App extends Component {
  state = {
    url: '',
    uniqueId: 'nuasdfasdfll',
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
    }).then(async res => {
      const { unique_id } = await res.json();
      this.setState({ uniqueId: unique_id });
    });
  };

  render() {
    const { url, uniqueId } = this.state;
    return (
      <div className="container">
        <h1>URL Shortener</h1>
        <form onSubmit={this.submitUrl}>
          <input value={url} onChange={({ target }) => this.setState({ url: target.value })} />
          <button type="submit">Generate URL</button>
        </form>
        {uniqueId && (
          <div className="display-results">
            <a href={`http://localhost:9000/${uniqueId}`}>http://localhost:9000/{uniqueId}</a>
            <button>&#11014; Copy Link &#11014;</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
