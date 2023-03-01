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
                <div className='screen__input'> {this.props.value.toString().includes('===') ? this.props.value.toString().replace(/===/g, '=') : this.props.value}</div>


                <div className='screen__result' id='display'>{this.props.result}


                </div>




            </>

        )

    }


}




class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            num: 0,
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

        const lengthNum = this.state.num.toString().length

        const stringNum = this.state.num.toString()

        const positionSign = this.state.num.toString().lastIndexOf(this.state.sign)
        const positionDecimal = this.state.num.toString().lastIndexOf('.')



        if ((lengthNum > 22) && (!stringNum.includes('+') && !stringNum.includes('-') && !stringNum.includes('X') && !stringNum.includes('/'))) {


            this.setState({
                res: 'DIGIT LIMIT MET'
            })

            setTimeout(function () {
                return (this.setState({
                    res: this.state.num
                }))
            }, 2000)

        } else {

            this.setState({

                num: this.state.num === '' && value === '0'
                    ? '0'
                    : this.state.num % 1 === 0 && !this.state.num.toString().includes('.')
                        ? Number(this.state.num + value)
                        : this.state.num + value,

            })


            this.setState((prev) => {
                return {
                    res: this.state.sign === ''
                        ? prev.num
                        // nếu num có chứa phép tính và có số nhập vào thì res sẽ bằng những số nhập vào sau phép tính
                        : stringNum.includes(this.state.sign) && value
                            ? prev.num.toString().slice(positionSign + 1)

                            //nếu num kết thúc với dấu '.' và có số nhập vào, hoặc vị trí dấu '.' 
                            //lớn hơn phép tính thì res sẽ bằng res hiện tại cộng thêm giá trị mới nhập vào
                            : (stringNum.endsWith('.') && value) || (positionDecimal > positionSign)
                                ? this.state.res + value


                                //ngược lại res sẽ bằng phép tính
                                : this.state.sign
                }
            })






        }



    };



    clickDecimalPoint(event) {

        event.preventDefault();

        const value = event.target.innerHTML;

        const positionSign = this.state.num.toString().lastIndexOf(this.state.sign)
        const positionDecimal = this.state.num.toString().lastIndexOf('.')

        const stringNum = this.state.num.toString();

        this.setState({

            decimal: value,
            num: (stringNum === '' && value === '.')

                ||

                ((stringNum.endsWith('+') || stringNum.endsWith('-') || stringNum.endsWith('X') || stringNum.endsWith('/')) && (value === '.'))

                ? this.state.num + '0.'

                : (!stringNum.includes('.') && value === '.')
                    || ((stringNum.includes('+') || stringNum.includes('-') || stringNum.includes('X') || stringNum.includes('/')) && (positionSign > positionDecimal))
                    ? this.state.num + value
                    : this.state.num,

            res: this.state.num

        }

        );


        const prevRes = this.state.res;


        this.setState({
            res: (typeof Number(prevRes) === 'number') && value === '.' ? prevRes + value
                : this.state.num
        }

        );

    }


    clickSign(event) {
        event.preventDefault();

        const value = event.target.innerHTML;

        const stringNum = this.state.num.toString();

        const positionDecimal = this.state.num.toString().lastIndexOf('=')


        this.setState({

            sign: value,
            res: value,

        }, () => {
            this.setState({
                num: //nếu num =0 hoặc rỗng mà input là phép tính thì num sẽ là phép tính
                    (this.state.num === 0) && (value === '-' || value === '+' || value === 'X' || value === '/')

                        ||

                        (this.state.num === '-' || this.state.num === '+' || this.state.num === 'X' || this.state.num === '/')

                        && (value === '-' || value === '+' || value === 'X' || value === '/')

                        ? value



                        : (stringNum.endsWith('--') || stringNum.endsWith('+-') || stringNum.endsWith('X-') || stringNum.endsWith('/-'))
                            && (value === '/' || value === 'X' || value === '+')

                            ? stringNum.slice(0, -2) + this.state.sign

                            //nếu ký tự cuối num là phép tính /, +, X và input là /,+, X
                            // thì thay đổi ký tự cuối của num thành phép tính nhập vào
                            : ((stringNum.endsWith('/') || stringNum.endsWith('X') || stringNum.endsWith('+'))
                                && (value === '+' || value === 'X' || value === '/'))

                                ||

                                ((stringNum.endsWith('-')) && (value === '+' || value === 'X' || value === '/'))

                                ? stringNum.replace(/.$/, this.state.sign)



                                : (stringNum.endsWith('--') || stringNum.endsWith('+-') || stringNum.endsWith('/-') || stringNum.endsWith('X-'))
                                    && (value === '-')
                                    ? this.state.num + ''



                                    : (stringNum.includes('=')) && (value === '+' || value === '-' || value === 'X' || value === '/')
                                        ? stringNum.slice(positionDecimal + 1) + value


                                        : this.state.num + value



            })
        })






    }


    clickEqual(event) {

        const inputEqual = event.target.innerHTML;




        if (this.state.num.toString().includes('X')) {

            const value = this.state.num.toString().replace(/X/g, '*')
            this.setState({
                res: eval(value),
                sign: '',
            }, () => {
                this.setState({ num: inputEqual === '=' ? `${this.state.num} === ${this.state.res}` : this.state.num })
            }
            )
        } else {

            this.setState({
                res: eval(this.state.num),
                sign: '',

            }, () => {
                this.setState({ num: inputEqual === '=' ? `${this.state.num} === ${this.state.res}` : this.state.num })
            }
            )

        }


    }






    clearInput() {

        this.setState({
            num: 0,
            res: 0,
            sign: ''
        });

    }





    render() {

        // clearInput
        // clickSign
        // clickDecimalPoint
        // clickNumber
        // clickEqual




        const arr = [[0, 'zero'], [1, 'one'], [2, 'two'], [3, 'three'], [4, 'four'],
        [5, 'five'], [6, 'six'], [7, 'seven'], [8, 'eight'], [9, 'nine'],
        ['+', 'add'], ['-', 'subtract'], ['X', 'multiply'], ['/', 'divide'],
        ['=', 'equals'], ['AC', 'clear'], ['.', 'decimal']];

        const itemList = arr.map((item) => {

            return (
                <div className='btn grid-item' key={item[1]} onClick={item[0] === 'AC'
                    ? this.clearInput
                    : item[0] === '+' || item[0] === '-' || item[0] === 'X' || item[0] === '/' ?
                        this.clickSign
                        : item[0] === '.'
                            ? this.clickDecimalPoint
                            : item[0] === '='
                                ? this.clickEqual
                                : this.clickNumber}

                    id={item[1]}
                >
                    {item[0]}

                </div>
            )

        })


        return (
            <>

                <div className='app-container'>


                    <div className='screen'>

                        <Screen sign={this.state.sign} value={this.state.num} result={this.state.res} />


                    </div>

                    <div className='buttons'>

                        <div className='grid-container'>{itemList}

                            {/* <div onClick={this.clearInput} className='clear-btn'>AC</div>

                            <div className='devide-multiply-btn flex'>

                                <div onClick={this.clickSign} className='devided'>/</div>
                                <div onClick={this.clickSign} className='multiple'>X</div>


                            </div> */}
                        </div>


                        <div className='number-equal-container flex'>

                            <div className='numbers-btn flex'>

                                {/* <div onClick={this.clickDecimalPoint} className='btn'>.</div>
                                <div onClick={this.clickNumber} className='btn'>0</div>
                                <div onClick={this.clickNumber} className='btn'>1</div>
                                <div onClick={this.clickNumber} className='btn'>2</div>
                                <div onClick={this.clickNumber} className='btn'>3</div>
                                <div onClick={this.clickNumber} className='btn'>4</div>
                                <div onClick={this.clickNumber} className='btn'>5</div>
                                <div onClick={this.clickNumber} className='btn'>6</div>
                                <div onClick={this.clickNumber} className='btn'>7</div>
                                <div onClick={this.clickNumber} className='btn'>8</div>
                                <div onClick={this.clickNumber} className='btn'>9</div> */}

                            </div>

                            <div className='sub-add-equal-wrapper'>

                                <div className='subtract-add-btn'>

                                    {/* <div onClick={this.clickSign} className='subtract btn'>-</div>
                                    <div onClick={this.clickSign} className='add btn'>+</div> */}

                                </div>

                                {/* <div onClick={this.clickEqual} className='btn' id='equals'>=</div> */}
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
