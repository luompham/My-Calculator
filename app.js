class Screen extends React.Component {

    constructor(props) {
        super(props);

    }

    // shouldComponentUpdate(nextProps, nextState) {

    //     return typeof Number(nextProps) === 'number';

    // }

    render() {

        return (
            <>
                <div className='screen__input'>num: {this.props.value}</div>

                <div className='screen__result'>res: {this.props.result}</div>

                <div className='screen__result'>sign: {this.props.sign}</div>
            </>

        )

    }


}




class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            num: '',
            sign: '',
            res: 0,
            decimal: ''
        };

        this.clickNumber = this.clickNumber.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.clickDecimalPoint = this.clickDecimalPoint.bind(this);
        this.clickSign = this.clickSign.bind(this);
        this.clickEqual = this.clickEqual.bind(this);

    };

    clickNumber(event) {

        event.preventDefault();

        const value = event.target.innerHTML;

        if (this.state.num.toString().length < 16) {

            this.setState({

                num: this.state.num === 0 && value === '0'
                    ? '0'
                    : this.state.num % 1 === 0 && !this.state.num.toString().includes('.')
                        ? Number(this.state.num + value)
                        : this.state.num + value,

                // !this.state.res ? 0 : this.state.res

            })


            this.setState((prevNum) => {
                return {
                    res: this.state.sign === ''
                        ? prevNum.num
                        : this.state.num.includes('+' || '-' || 'X' || '/')
                            ? value
                            : this.state.sign,

                }
            });




        }

        // console.log(this.state.res)


    };



    clickDecimalPoint(event) {

        event.preventDefault();

        const value = event.target.innerHTML;

        const positionSign = this.state.num.toString().lastIndexOf(this.state.sign)
        const positionDecimal = this.state.num.toString().lastIndexOf('.')


        this.setState({

            decimal: value,
            num: this.state.num === '' && value === '.' ? '0.' :
                !this.state.num.toString().includes('.') || positionSign > positionDecimal
                    ? this.state.num + value
                    : positionSign < positionDecimal && value === '.' ? this.state.num + ''

                        : this.state.num,


        });

        this.setState((prevNum) => {
            return { res: prevNum.num }
        });



        return console.log(this.state.num.toString().lastIndexOf('+' || '-' || 'X' || '/'))


    }


    clickSign(event) {
        event.preventDefault();

        const value = event.target.innerHTML;

        // this.setState({
        //     sign: value,
        //     res: !this.state.res && this.state.num ? this.state.num : this.state.res,
        //     num: 0

        // })

        this.setState((prevNum) => {
            return {
                sign: value,
                res: value,
                num: prevNum.num + value
            }
        });


        // console.log(this.state.sign)

    }


    clickEqual() {

        //   const value = this.state.num.toString().replace(/X/g, '*')
        // return console.log(value)

        if (this.state.num.toString().includes('X')) {

            const value = this.state.num.toString().replace(/X/g, '*')
            this.setState({
                res: eval(value),
                sign: '',
                num: 0
            })
        } else {

            this.setState({
                res: eval(this.state.num),
                sign: '',
                num: 0
            })
        }




        // if (this.state.num && this.state.sign) {

        //     // const math = (a, b, sign) => {
        //     //     return (

        //     //         sign === '+' ? a + b : sign === '-' ? a - b : sign === 'X' ? a * b : a / b

        //     //     )


        //     // }







        // }

    }






    clearInput() {

        this.setState({
            num: '',
            res: 0,
            sign: ''
        });

    }





    render() {

        return (
            <>

                <div className='app-container'>


                    <div className='screen'>

                        <Screen sign={this.state.sign} value={this.state.num} result={this.state.res} />


                    </div>

                    <div className='buttons'>

                        <div className='AC-devide-multiply-btn flex'>

                            <div onClick={this.clearInput} className='clear-btn'>AC</div>

                            <div className='devide-multiply-btn flex'>

                                <div onClick={this.clickSign} className='devided'>/</div>
                                <div onClick={this.clickSign} className='multiple'>X</div>


                            </div>
                        </div>


                        <div className='number-equal-container flex'>

                            <div className='numbers-btn flex'>

                                <div onClick={this.clickDecimalPoint} className='btn'>.</div>
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

                                    <div onClick={this.clickSign} className='subtract btn'>-</div>
                                    <div onClick={this.clickSign} className='add btn'>+</div>

                                </div>

                                <div onClick={this.clickEqual} className='btn' id='equals'>=</div>
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
