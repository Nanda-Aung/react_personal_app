import { logDOM } from "@testing-library/react";
import React from "react";
import './App.css';
import getQuiz from './data/quiz'
import logo from './logo.svg'

class NavBar extends React.Component{
  render(){
    const menuItems = [
      {
        title: "Home",
        to: '/'
      },
      {
        title: "Search",
        submenu: [
          {
            title: "Linear Search",
            to: '/search/linear'
          },
          {
            title: "Binary Search",
            to: '/search/binary'
          }
        ],
      },
      {
        title: "About",
        submenu: [
          {
            title: "Who we are",
            to: '/'
          },
          {
            title: "Our values",
            to: '/'
          },
        ],
      },
    ];
    return(
      <nav>
        <ul className="Menu">
          {menuItems.map((item,index)=>{
            return(
              <li className="menuItem" key={index}>
                {
                  item.to ?(
                    <a href={item.to}>{item.title}</a>
                  ) :item.title
                }
                {
                  item.submenu ?(
                    <ul className="subMenu">
                      {item.submenu.map((sub,index) =>{
                        return(
                          <li key={index} className="subItem">
                            <a href={sub.to}>{sub.title}</a>
                          </li>
                        )
                      })}
                    </ul>
                  ) : ''}
              </li>
            );
          })

          }
        </ul>
      </nav>
    )
  }
}

class App extends React.Component{
  constructor (){
    super();
    this.state = {
      activeView:'quizOverView',
      quiz:getQuiz(),
      answers:[]
    }
    this.withoutParam = this.withoutParam.bind(this);// add this line to bind 'this'

  }

  // below the constructor
withoutParam() {
  console.log('Testing')
  console.log(this.state)
}

submitAnswer(answer) {
  // console.log(answer)
  answer.status = 1
  this.setState((prevState) => {
    return {
      'buttonsDisabled': true,
      'answers': Object.assign({ [this.state.currentQuestionIndex]: answer }, prevState.answers)
    };
  });
  var app = this;// to use within a closure
  window.setTimeout(function () {
    let nextIndex = app.state.currentQuestionIndex + 1,
      hasMoreQuestions = (nextIndex < app.state.quiz.numOfQuestions);

    if(hasMoreQuestions){
      app.showQuizQuestions(nextIndex)
    }else{
      app.showResults()
    }
    console.log(app.state.answers)


  }, app.state.transitionDelay);
}
showResults() {
  this.setState((prevState) => {
    return {
      activeView: 'quizResults'
    };
    
      
    
  });
}


// add below constructor
showQuizQuestions(index) {
  
  

  this.setState(() => {
     console.log("setting")
  // console.log(index)

    return {
      'currentQuestionIndex': index,
      'activeView': 'quizQuestions',
      'buttonsDisabled': false,
    }
  });
  console.log(this.state)


}

  




  render(){

    let question = this.state.quiz.questions[this.state.currentQuestionIndex]
    let qus = this.state.quiz.questions

    return(
      <div className="App">
        <NavBar />
        {
          this.state.activeView ==='quizOverView' && (
            <section className='overviewSection' style={{ display: 'flex',flexDirection:'column', justifyContent: 'center',alignItems:'center' }}>
          <div className='imageWrapper' >
            <img src={logo} alt="banner" className='banner' width="100" height="100" />
          </div>
          <div className='description'>
            {this.state.quiz.introduction}
          </div>
          <button style={{ 
            marginTop:'8px',padding: '8px',
            cursor: 'pointer', background:'rgb(203, 179, 220)',
            fontSize:'20px'}}
            onClick={this.withoutParam}
            >
            Let Start Function
            </button>

            <button style={{ 
            marginTop:'8px',padding: '8px',
            cursor: 'pointer', background:'rgb(203, 179, 220)',
            fontSize:'20px'}}
            onClick={()=>this.withoutParam()}
            >
            Let Test (Arrow) 
            </button>


            <button style={{
              marginTop: '8px', padding: '8px',
              cursor: 'pointer', background: 'rgb(203, 179, 220)',
              fontSize: '20px'
            }}
              onClick={this.withoutParam.bind(this)}
            >
              Let Test (Arrow)
            </button>


            <button style={{
              marginTop: '8px', padding: '8px',
              cursor: 'pointer', background: 'rgb(203, 179, 220)',
              fontSize: '20px'
            }}
              onClick={this.showQuizQuestions.bind(this,0)}
            >
              Let's Start (Bind in Render)
            </button>


        </section> 
          )
        }

  
       { this.state.activeView==="quizQuestions" &&
        (
        <section className='questionSection' style={{display: 'flex',flexDirection:'column',justifyContent: 'center',alignItems:'center'}}>
            <div className="question">
              {question.question}
            </div>
            <div className="answers">
              {
              
                question.answers.map((answer, i) =>
                  (<p key={i}>
                    <button className="ans_button" onClick={()=>this.submitAnswer(answer)} disabled={this.state.buttonsDisabled}>{answer.ur_answer}</button>
                  </p>)
                )
              }
             </div>
        </section>)}

      

        {
          this.state.activeView==="quizResults" &&
          (
            qus.map((question,i)=>(
              <div key={i}>
               <h3>{question.question}</h3>

                {question.answers.map((ans, i)=>(
                  <div key={i}>
                    {ans.status===1?
                    (i+1 === question.correct?(<p style={{color:"green"}}>✔️{ans.ur_answer}</p>):(<p style={{color:"red"}}>❌{ans.ur_answer}</p>))
                  :(<p>{ans.ur_answer}</p>)}
                  </div>
                ))}
                <p style={{color:"green"}}>{question.explanation}</p>
                <hr />
                </div>
            ))
          )
        }

  

        
        

      </div>
    );
  }
}
export default App;