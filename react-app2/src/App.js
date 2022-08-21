
import { Component, useEffect, useState } from 'react';
import './App.css';

function App() {

  const [funcShow, setFuncShow] = useState(true);
  const [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello World</h1>
      <input type="button" value="show all"
        onClick={function () {
          setClassShow(true);
          setFuncShow(true);
        }}
      />
      <input type="button" value="remove func"
        onClick={function () {
          setFuncShow(false);
        }}
      />
      <input type="button" value="remove class"
        onClick={function () {
          setClassShow(false);
        }}
      />
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

let funStyle = "color:#03a9f4";
let funcId = 0;
function FuncComp(props) {

  // let numberState = useState(props.initNumber);
  // let number = numberState[0];
  // let setNumber = numberState[1];

  // let dateState = useState((new Date()).toString());
  // let _date = dateState[0];
  // let setDate = dateState[1];


  //useEffect 복수개 사용가능
  const [number, setNumber] = useState(props.initNumber);
  const [_date, setDate] = useState((new Date()).toString());
  //console.log('%cfunc => render   ' + (++funcId), funStyle);

  useEffect(() => {
    console.log('%cfunc => useEffect   A  number' + (++funcId), funStyle);
    //setNumber(props.initNumber);
  }, [number]);

  useEffect(() => {
    console.log('%cfunc => useEffect  B  _date' + (++funcId), funStyle);
    document.title = _date;

    return function () { //클린작업시 사용
      console.log('%cfunc => useEffect  B  _date 클린작업 (componentDidMount & componentDidUpdate) ' + (++funcId), funStyle);
    }

  }, [_date]);



  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>

      <input type="button" value="random"
        onClick={function () {
          setNumber(Math.random());
        }} />

      <input type="button" value="date"
        onClick={function () {
          setDate((new Date()).toString());
        }} />


    </div>
  );
}



let classStyle = "color:red";
class ClassComp extends Component {
  state = {
    number: this.props.initNumber,
    date: (new Date()).toString()
  }

  //componentWillMount 주로 연결했던 이벤트 리스너를 제거하는 등의 여러 가지 정리 활동
  //컴포넌트가 소멸된 시점에(DOM에서 삭제된 후) 실행되는 메소드다.
  //컴포넌트 내부에서 타이머나 비동기 API를 사용하고 있을 때, 이를 제거하기에 유용하다
  componentWillUnmount() {
    console.log("%cclass => componentWillUnmount", classStyle);
  }

  //componentDidMount() 는 컴포넌트가 마운트된 직후, 즉 트리에 삽입된 직후에 호출
  //컴포넌트가 만들어지고 render가 호출된 이후에 호출되는 메소드다.
  // AJAX나 타이머를 생성하는 코드를 작성하는 부분이다.
  componentDidMount() {
    console.log("%cclass => componentDidMount", classStyle);
  }

  //컴포넌트 업데이트 직전에 호출되는 메소드다.
  //props 또는 state가 변경되었을 때, 재랜더링을 여부를 return 값으로 결정한다.
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
    return true;
  }

  //shouldComponentUpdate가 불린 이후에 컴포넌트 업데이트 직전에서 호출되는 메소드다.
  //새로운 props 또는 state가 반영되기 직전 새로운 값들을 받는다.
  //이 메서드 안에서 this.setState()를 사용하면 무한 루프가 일어나게 되므로 사용하면 안된다.
  // componentWillUpdate(nextProps, nextState) {
  //   console.log("componentWillUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
  // }



  render() {
    console.log('%cclass => render ', classStyle);

    return (
      <div className='container'>
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random"
          onClick={function () {
            this.setState({ number: Math.random() })
          }.bind(this)} />

        <input type="button" value="date"
          onClick={function () {
            this.setState({ date: (new Date()).toString() })
          }.bind(this)} />

      </div >
    )
  }
}

export default App;
