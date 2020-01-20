import React from 'react'

class MemeGenerator extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            top_text : "",
            bottom_text : "",
            random_image : "http://i.imgflip.com/1bij.jpg",
            allMemeImgs : []
        }

        this.handleChange = this.handleChange.bind(this);
        this.generateMeme = this.generateMeme.bind(this);
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(res => {
                const memes = res.data.memes;
                this.setState({allMemeImgs : memes})
            })
            .catch(err => console.log(err));    
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({[name] : value});
    }

    generateMeme(event){
        event.preventDefault();
        const idx = Math.floor((Math.random() * 99));
        const randomImgUrl = this.state.allMemeImgs[idx].url;
        
        this.setState({random_image : randomImgUrl});
    }

    render(){
        return(
            <div>
                <form onSubmit={this.generateMeme} className="meme-form">
                    <input name="top_text" placeholder="TOP TEXT" value={this.state.top_text} onChange={this.handleChange} />
                    <input name="bottom_text" placeholder="BOTTOM TEXT" value={this.state.bottom_text} onChange={this.handleChange} />
                
                    <button> GEN </button>
                </form>

                <div className="meme">
                    <img src={this.state.random_image} alt="" />
                    <h2 className="top"> {this.state.top_text} </h2>
                    <h2 className="bottom"> {this.state.bottom_text} </h2>
                </div>
            </div>
        )
    }

}

export default MemeGenerator