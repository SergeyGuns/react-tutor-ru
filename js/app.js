
var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },
  getInitialState: function() {
    return {
      visible: false
    };
  },
  readmoreClick: function(e) {
    e.preventDefault();
    this.setState({visible: true}, function() {
      console.log('Состояние изменилось');
    });
  },
  render: function () {
    var author = this.props.data.author;
    var text = this.props.data.text;
    var bigText = this.props.data.bigText;
    var visible = this.state.visible;

    return (
      <div className = 'article'>
        <p className = 'news__author'>{author}</p>
        <p className = 'news__text'>{text}</p>
        <a href="#" 
          onClick={this.readmoreClick} 
          className={'news__readmore ' + (visible ? 'none': '')}>
          Подробнее
        </a>
        <p 
          className = {'news__big-text ' + (visible ? '': 'none')}>
          {bigText}
        </p>
      </div>
    ) 
  }
})

var News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
      counter: 0
    };
  },
  render: function () {
    
    var data = this.props.data
    var newsTamplate;
    if(data.length){
      newsTamplate = data.map((item, index)=>{
        return (
          <div key={index}>
            <Article data={item} />
          </div>
        )
      })
    } else {
      newsTamplate = <p>К сожелению новостей нету</p>
    }
    return (
      <div className='news'>
        {newsTamplate}
        <strong 
          className={'news__count '+(data.length>0?'':'none')}>  
          Всего новостей {data.length}
        </strong>
      </div>
    )
  }
});


var Add = React.createClass({
  writeInput: function(e) {
    let author = ReactDOM.findDOMNode(this.refs.author).value.trim();
    let text = ReactDOM.findDOMNode(this.refs.text).value.trim();
    let checkrule = !ReactDOM.findDOMNode(this.refs.checkrule).checked;
    console.log(checkrule)
    
    this.setState({authorIsEmpty: !author})
  
    this.setState({textIsEmpty: !text})

    this.setState({agreeNotChecked: checkrule})
    // console.log(ReactDOM.findDOMNode(this.refs.text).value)
    // console.log(e.target);
    // this.setState({inputValue: e.target.value});
  },
  getInitialState: function(){
    return {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    };
  },
  componentDidMount: function(){
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  onCheckRuleClick: function(e){
    this.setState({btnIsDisabled: !this.state.btnIsDisabled});
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      likesIncreasing: nextProps.likeCount > this.props.likeCount
    });
  },
  onBtnClickHandler: function(e){
    e.preventDefault();
    var author = ReactDOM.findDOMNode(this.refs.author).value
    var text = ReactDOM.findDOMNode(this.refs.text).value
    alert(author+'/'+text)
  },
  render: function() {
    return (
      <form className='add cf'>
        <input 
          className='add__author' 
          defaultValue =''
          onChange={this.writeInput}
          placeholder='Ваше имя'
          ref='author' 
        />
        <textarea
          className='add__text'
          defaultValue=''
          placeholder='Текст новости'
          onChange={this.writeInput}
          ref='text'
         />
        <label className='add__checkrule'>
          <input 
            type='checkbox' 
            ref='checkrule'
            onChange={this.writeInput}
          />
          Я согласен с правилами
        </label>
        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled={this.state.agreeNotChecked || this.state.authorIsEmpty || this.state.textIsEmpty}>
          Показать alert
        </button>
      </form>
    )
  }
});


var App = React.createClass({
  render: function() {
    return (
      <div className='app'>
        <h3>Новости</h3>
        <Add />
        <News data = {my_news}/> 
      </div>
    );
  }
});


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
