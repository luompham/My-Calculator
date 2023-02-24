class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            input: 0,
            countInput: 0,
        };

        this.clickNumber = this.clickNumber.bind(this);
        this.clearInput = this.clearInput.bind(this);

    };

    clickNumber(event) {

        // console.log(typeof Number(event.target.innerHTML));
        const number = event.target.innerHTML;

        // switch (number+this.state.input) {
        //     case '.':

        //     case 
        //         break;

        //     default:
        //         break;
        // }


        this.setState((prev) => {
            return { input: parseInt(`${prev.input}${number}`, 10) }
        })




        console.log('input: ', typeof this.state.input);





    }



    clearInput() {

        this.setState({ input: 0 });

    }



    render() {

        return (
            <>

                <div className='app-container'>


                    <div className='screen'>

                        <div className='screen__input'>{this.state.input}</div>

                        <div className='screen__result'>{this.state.input}</div>

                    </div>

                    <div className='buttons'>

                        <div className='AC-devide-multiply-btn flex'>

                            <div onClick={this.clearInput} className='clear-btn'>AC</div>

                            <div className='devide-multiply-btn flex'>

                                <div className='devided'>/</div>
                                <div className='multiple'>X</div>


                            </div>
                        </div>


                        <div className='number-equal-container flex'>

                            <div className='numbers-btn flex'>

                                <div onClick={this.clickNumber} className='btn'>.</div>
                                <div onClick={this.clickNumber} className='btn'>0</div>
                                <div onClick={this.clickNumber} className='btn'>1</div>
                                <div onClick={this.clickNumber} className='btn'>2</div>
                                <div onClick={this.clickNumber} className='btn'>3</div>
                                <div onClick={this.clickNumber} className='btn'>4</div>
                                <div onClick={this.clickNumber} className='btn'>5</div>
                                <div onClick={this.clickNumber} className='btn'>6</div>
                                <div onClick={this.clickNumber} className='btn'>7</div>
                                <div onClick={this.clickNumber} className='btn'>8</div>
                                <div onClick={this.clickNumber} className='btn'>9</div>

                            </div>

                            <div className='sub-add-equal-wrapper'>

                                <div className='subtract-add-btn'>

                                    <div className='subtract btn'>-</div>
                                    <div className='add btn'>+</div>

                                </div>

                                <div className='btn' id='equals'>=</div>
                            </div>

                        </div>

                    </div>













                </div>



            </>
        )



    }

}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
