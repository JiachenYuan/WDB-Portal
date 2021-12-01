import React from 'react';
class EmbeddedPage extends React.Component {
    
    
    render() {
        if (this.props.display) {
            return <div className='IframeContainter'>testtest</div>
        } else {
            return <div></div>
        }
    }
}

export default EmbeddedPage;