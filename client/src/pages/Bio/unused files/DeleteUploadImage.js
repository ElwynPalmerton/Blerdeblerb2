import Axios from 'axios';
import React from 'react'
import API from '../../../utils/API';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

class UploadImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: ''
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    console.log(this.state.file);
    formData.append('myImage', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    API.post('/users/image', formData, config)
      .then((response) => {
        console.log('response: ', response);




      }).catch((error) => {
        console.log("Error uploading image: ", error);

      })
    console.log("props: ", this.props);
  }

  onChange(e) {

    console.log(e);
    this.setState({
      file: e.target.files[0],
      name: e.target.files[0].name
    });
  }

  render() {
    return (
      <div>

        <form onSubmit={this.onFormSubmit}>
          <h1>Upload Image</h1>

          <p>{name}</p>
          <Button
            variant="contained"
            component="label"
          >
            Choose File
          <input
              hidden
              type="file"
              name="newUserAvatar"
              onChange={this.onChange}
            />
          </Button>
          <br />
          <Button
            type="submit"
            variant="contained"
          >Upload</Button>
        </form>

      </div>

    )
  }
}

export default UploadImage;