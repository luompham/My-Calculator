class Screen extends React.Component {

    constructor(props) {
        super(props);

    }


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
            num: '',
            sign: '',
            res: 0,
            // decimal: '',
        };

        this.clickNumber = this.clickNumber.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.clickDecimalPoint = this.clickDecimalPoint.bind(this);
        this.clickSign = this.clickSign.bind(this);
        this.clickEqual = this.clickEqual.bind(this);
        this.clickDeleteOne = this.clickDeleteOne.bind(this);

    };

    clickNumber(event) {

        event.preventDefault();

        const value = event.target.innerHTML;
        const lengthNum = this.state.num.toString().length;
        const stringNum = this.state.num.toString();
        const positionSign = this.state.num.toString().lastIndexOf(this.state.sign);
        const positionDecimal = this.state.num.toString().lastIndexOf('.');
        const checkNumNotIncludeOperator = (!stringNum.includes('+') && !stringNum.includes('-') && !stringNum.includes('X') && !stringNum.includes('/'));


        if ((lengthNum === 22) && (checkNumNotIncludeOperator) && value) {


            this.setState({
                res: 'DIGIT LIMIT MET'
            })

            setTimeout(() => {
                return (this.setState({
                    res: this.state.num
                }))
            }, 1000)

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

            // decimal: value,
            num: (stringNum === '' && value === '.')

                ||

                ((stringNum.endsWith('+') || stringNum.endsWith('-') || stringNum.endsWith('X') || stringNum.endsWith('/')) && (value === '.'))

                ? this.state.num + '0.'

                : (!stringNum.includes('.') && value === '.')
                    || ((stringNum.includes('+') || stringNum.includes('-') || stringNum.includes('X') || stringNum.includes('/')) && (positionSign > positionDecimal))
                    ? this.state.num + value
                    : this.state.num,


        }, () => {
            this.setState({
                res: ((stringNum.endsWith('+') || stringNum.endsWith('-') || stringNum.endsWith('X') || stringNum.endsWith('/')) && (value === '.'))
                    ? '0.'
                    : (stringNum.includes('.') && positionDecimal > positionSign) && (value === '.')
                        ? stringNum.slice(positionSign + 1)
                        : this.state.res
            })
        }

        );


        const prevRes = this.state.res;


        this.setState({
            res: ((typeof Number(prevRes) === 'number') && (!prevRes.toString().includes('.'))) && (value === '.') ? prevRes + value
                : this.state.res
        }

        );

        //

    }


    clickSign(event) {
        event.preventDefault();

        const value = event.target.innerHTML;

        const stringNum = this.state.num.toString();

        const positionEqual = this.state.num.toString().lastIndexOf('=')


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
                                        ? stringNum.slice(positionEqual + 1) + value


                                        : this.state.num + value



            })
        })






    }


    clickEqual(event) {

        const inputEqual = event.target.innerHTML;
        const stringNum = this.state.num.toString();
        const positionEqual = this.state.num.toString().lastIndexOf('=');



        if (stringNum.includes('X')) {

            const value = stringNum.replace(/X/g, '*')
            this.setState({
                res: eval(value),
                sign: '',
            }, () => {
                this.setState({
                    num: stringNum.includes('=') && inputEqual === '=' ? this.state.num
                        : inputEqual === '=' ? `${this.state.num} === ${this.state.res}` : this.state.num,
                    res: stringNum.includes('=') && inputEqual === '=' ? stringNum.slice(positionEqual + 1) : eval(value)
                })
            }
            )
        } else if (stringNum === '' && inputEqual) {
            this.setState({
                sign: '',

            }, () => {
                this.setState({
                    num: '=' + NaN,
                    res: NaN.toString()
                })
            }
            )

        } else {

            this.setState({
                res: eval(stringNum),
                sign: '',

            }, () => {
                this.setState({
                    num: stringNum.includes('=') && inputEqual === '=' ? this.state.num
                        : inputEqual === '=' ? `${this.state.num} === ${this.state.res}` : this.state.num,
                    res: stringNum.includes('=') && inputEqual === '=' ? stringNum.slice(positionEqual + 1) : eval(stringNum)
                })
            }
            )

        }


    }




    clearInput() {

        this.setState({
            num: '',
            res: 0,
            sign: ''
        });

    }


    clickDeleteOne() {


        this.setState({
            num: this.state.num.toString().slice(0, -1),
            res: this.state.res.toString().slice(0, -1),

        });


    }


    render() {


        const arr = [[0, 'zero'], [1, 'one'], [2, 'two'], [3, 'three'], [4, 'four'],
        [5, 'five'], [6, 'six'], [7, 'seven'], [8, 'eight'], [9, 'nine'],
        ['+', 'add'], ['-', 'subtract'], ['X', 'multiply'], ['/', 'divide'],
        ['=', 'equals'], ['AC', 'clear'], ['.', 'decimal'], ['Clear', 'deleteOne']];

        const itemList = arr.map((item) => {

            return (
                <div
                    className={`btn grid-item ${item[0] === 'AC' || item[0] === 'Clear'
                        ? 'danger'
                        : item[0] === '='
                            ? 'equals'
                            : item[0] === '+' || item[0] === '-' || item[0] === 'X' || item[0] === '/'
                                ? 'operators'
                                : 'numbers'
                        }`}
                    key={item[1]} onClick={item[0] === 'AC'
                        ? this.clearInput
                        : item[0] === '+' || item[0] === '-' || item[0] === 'X' || item[0] === '/'
                            ? this.clickSign
                            : item[0] === '.'
                                ? this.clickDecimalPoint
                                : item[0] === '='
                                    ? this.clickEqual
                                    : item[0] === 'Clear'
                                        ? this.clickDeleteOne
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

                        </div>

                    </div>




                </div>



            </>
        )



    }

}



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
