/**
 *
 */
import {Component} from 'react';
import React from 'react';

import {addCertificateTemplate} from '../../api/template';
import placeholder from './placeholder.png';
import spinner from './tail-spin.svg';

/** Dashboard container */
class Dashboard extends Component {
  state = {
    // Initially, no file is selected
    selectedTemplate: null,

    uploadingTempalte: false,

    // This will hold the metadata of the templates we've uploaded
    templatesRepository: {},
  };

  // On template select (from the pop up)
  onTemplateChange = (event) => {
    // Update the state
    this.setState({selectedTemplate: event.target.files[0]});
  };

  // On file upload (click the "upload" button)
  onTemplateUpload = () => {
    // Log metadata of selected template
    console.log(this.state.selectedTemplate);

    // Signal the display of spinner
    this.setState({uploadingTempalte: true});

    addCertificateTemplate(this.state.selectedTemplate).then((res) => {
      // Update templates repository
      const templateRepo = Object.assign(
          {},
          this.state.templatesRepository,
          res.data,
      );
      this.setState({templatesRepository: templateRepo});

      // Signal the removal of spinner
      this.setState({uploadingTempalte: false});
    });
  };

  // Display uploaded templates
  onContentChange = () => {
    if (this.state.uploadingTempalte) {
      return <img src={spinner} className="mx-auto d-block" alt="spinner" />;
    }

    if (Object.keys(this.state.templatesRepository).length == 0) {
      // Log template repository state
      console.log(this.state.templatesRepository);

      return (
        <img
          src={placeholder}
          className="img-placeholder"
          alt="placeholder"
        ></img>
      );
    }
    return (
      <img src={this.state.templatesRepository.template_thumbnail_url}></img>
    );
  };

  /**
   * Render component
   * @return {any}
   */
  render() {
    return (
      <div className="container vh-100 text-light">
        <div className="row align-items-center vh-100">
          <div className="col">
            <h1 className="mb-4">Upload e-Certificate Template</h1>
            <label htmlFor="templateForm" className="form-label mb-2">
              Choose an e-Certificate template file to upload.
            </label>
            <br></br>
            <div className="d-inline-flex">
              <input
                className="form-control me-2"
                type="file"
                id="templateForm"
                onChange={this.onTemplateChange}
              ></input>
              <button
                className="btn btn-primary"
                onClick={this.onTemplateUpload}
              >
                Upload!
              </button>
            </div>
          </div>
          <div className="col">{this.onContentChange()}</div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
