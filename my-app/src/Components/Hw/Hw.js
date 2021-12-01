import './Hw.css';
import React from 'react';
import EmbeddedPage from '../EmbeddedPage/EmbeddedPage'


class HwContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            IsUploaded: false
        }
        this.flipIsUploaded = this.flipIsUploaded.bind(this);
    }

    flipIsUploaded() {
        console.log(this.state);
        this.setState({IsUploaded:!this.state.IsUploaded});
    }

    

    render() {
        let unexpandedStyle = {
            width: "400px",
            height: "30px",
            position: "relative",
            top: "30px",
            left: "50px",
            backgroundColor: "beige",
            border: "solid",
            borderRadius: "10px",
            borderWidth:"1px" 
        }
        let expandedStyle = {
            width: "400px",
            height: "600px",
            position: "relative",
            top: "30px",
            left: "50px",
            backgroundColor: "beige",
            border: "solid",
            borderRadius: "10px",
            borderWidth:"1px" 
        }

        return (
        <React.Fragment>
            <div className="HwContainer" style={(this.state.IsUploaded)?expandedStyle:unexpandedStyle}>
                <div className="uploadButton" onClick={this.flipIsUploaded}>{this.state.IsUploaded ? "Cancel" : "Upload"}</div>
                <EmbeddedPage display={this.state.IsUploaded}/>
            </div>
        </React.Fragment>
        );
    }
}



export default HwContainer;