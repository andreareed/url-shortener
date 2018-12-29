import React, { Component } from 'react';

const validate = url => {
  const regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  return regex.test(url);
};

class App extends Component {
  state = {
    url: '',
    uniqueId: null,
    error: false,
  };

  submitUrl = e => {
    e.preventDefault();
    const { url } = this.state;

    if (!validate(url)) {
      this.setState({ error: true });
    }

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

  copyLink = () => {
    const range = document.createRange();
    const select = window.getSelection();

    range.selectNodeContents(this.link);
    select.removeAllRanges();
    select.addRange(range);
    document.execCommand('copy');
  };

  render() {
    const { url, uniqueId, error } = this.state;
    return (
      <div className="container">
        <h1>URL Shortener</h1>
        <form onSubmit={this.submitUrl}>
          <input
            value={url}
            onChange={({ target }) => this.setState({ url: target.value, error: false })}
          />
          {error && <div className="error">Please enter a valid URL</div>}
          <button type="submit">Generate URL</button>
        </form>
        {uniqueId && (
          <div className="display-results">
            <a
              href={`http://localhost:9000/${uniqueId}`}
              target="_blank"
              rel="noopener noreferrer"
              ref={ref => (this.link = ref)}
            >
              http://localhost:9000/{uniqueId}
            </a>
            <button onClick={this.copyLink}>&#11014; Copy Link &#11014;</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
