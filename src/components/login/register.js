import React, {Component } from 'react';
import { Dimensions,View,TextInput,TouchableOpacity,Text,StyleSheet,PixelRatio} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import * as action from '../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Toast from 'react-native-root-toast'
var {height, width} = Dimensions.get('window');

class register extends Component {
  constructor(props) {
    super(props);
    this.afterEnd =  this._afterEnd;
    this.navigation = props.navigation;
    this.state = {
      username: '',
      password: '',
      nickname:'',
      code:'',
      token: '',
      timeLeft:60,
      begin:0,
      isDisable:false
    };
  }
  componentDidMount() {
  }

  static navigationOptions = {
    header:null,
  };
  countdownfn(timeLeft, callback, begin) {
    if (timeLeft > 0) {
      this.state.begin = 1;

      let that = this;
      let interval = setInterval(function () {
        if (that.state.timeLeft < 1) {
          clearInterval(interval);
          callback(that)
          that.setState({
            isDisable:false
          })
        } else {
          let totalTime = that.state.timeLeft;
          that.setState({
            timeLeft: totalTime - 1,
            isDisable:true
          })
        }
      }, 1000)
    }
  }
  _beginCountDown() {
    const {actions} = this.props;
    const params = {
      phone: this.state.username,
    }
    actions.GetCode( params,(succecd,data)=>{
      console.log(data)
      if(data.code !== 200){
          Toast.show(data.message, {
            duration: 1000, // toast显示时长
            position: height/3, // toast位置
            shadow: true, // toast是否出现阴影
            animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
            hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
            delay: 0, // toast显示的延时
          });
      }else{
        let time = this.state.timeLeft;
        let afterEnd = this.afterEnd;
        let begin = this.state.begin;
        this.countdownfn(time, afterEnd, begin)
      }
    });

  }
  _afterEnd(that) {
    that.setState({
      begin : 0,
      timeLeft : 60,

    })
  }
  onPressLogin() {

    switch ("") {
      case this.state.password:

        return Toast.show('请输入密码，密码不得为空', {
          duration: 1000, // toast显示时长
          position: height/3, // toast位置
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0, // toast显示的延时
        });
      case this.state.code:
        return Toast.show('请输入验证码，验证码不得为空', {
          duration: 1000, // toast显示时长
          position: height/3, // toast位置
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0, // toast显示的延时
        });
      case this.state.nickname:
        return Toast.show('请输入昵称，昵称不得为空', {
          duration: 1000, // toast显示时长
          position: height/3, // toast位置
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0, // toast显示的延时
        });
      default:
        const {actions} = this.props;
        const parames = {
          phone: this.state.username,
          password:this.state.password,
          captcha:this.state.code,
          nickname:this.state.nickname,

        }
        actions.GetRegister( parames,(succecd,data)=>{
          if(data.code !== 200){
            return Toast.show(data.message, {
              duration: 1000, // toast显示时长
              position: height/3, // toast位置
              shadow: true, // toast是否出现阴影
              animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
              hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
              delay: 0, // toast显示的延时
            });
          }else{
            const{navigation}=this.props;
            if(navigation){
              navigation.goBack();
            }
            return Toast.show('注册成功', {
              duration: 1000, // toast显示时长
              position: height/3, // toast位置
              shadow: true, // toast是否出现阴影
              animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
              hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
              delay: 0, // toast显示的延时
            });
          }
        });
    }
  }

  onPressBack(){
    const{navigation}=this.props;
    if(navigation){
      navigation.goBack();
    }
  }
  static navigationOptions = {
    header:null,  //隐藏顶部导航栏
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.onPressBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>注册</Title>
          </Body>
          <Right/>
        </Header>
        <View style={styles.container}>
          <View style={styles.containers}>
            <Text style={styles.textStyle}>注册页面</Text>
          </View>
          <View style={{height:height/10}}></View>
          <View style={styles.inputView}>
            <View style={[styles.view, styles.lineTopBottom]}>
              <Text style={styles.text}>手机号:</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder="请输入您的手机号码"
                clearButtonMode="while-editing"
                secureTextEntry={false}
                onChangeText={(text) => {
                  this.setState({
                    username: text
                  });
                }}
                value={this.state.username}
              />
            </View>
            <View style={[styles.view, styles.lineTopBottom]}>
              <Text style={styles.text}>密&nbsp;&nbsp;&nbsp;&nbsp; 码:</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder="请输入密码"
                clearButtonMode="while-editing"
                secureTextEntry
                onChangeText={(text) => {
                  this.setState({
                    password: text
                  });
                }}
                value={this.state.password}
              />
            </View>
            <View style={[styles.view, styles.lineTopBottom]}>
              <Text style={styles.text}>昵&nbsp;&nbsp;&nbsp;&nbsp; 称:</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder="请输入昵称"
                clearButtonMode="while-editing"
                secureTextEntry={false}
                onChangeText={(text) => {
                  this.setState({
                    nickname: text
                  });
                }}
                value={this.state.nickname}
              />
            </View>
            <View style={[styles.view, styles.lineTopBottom]}>
              <Text style={styles.text}>验证码:</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder="请输入验证码"
                clearButtonMode="while-editing"
                secureTextEntry={false}
                onChangeText={(text) => {
                  this.setState({
                    code: text
                  });
                }}
                value={this.state.code}
              />
              <TouchableOpacity
                disabled={this.state.isDisable}
                onPress={this._beginCountDown.bind(this)}
              >
                <Text style={styles.texts} >{ this.state.begin === 0 ? '获取验证码' : this.state.timeLeft+"秒后重试"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onPressLogin()}
            >
              <Text style={styles.buttonText}>注   册</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}

export default connect(
  state => ({
    state: state.user,
  }),
  dispatch => ({
    actions: bindActionCreators(action.user, dispatch),
  }),
)(register);
const styles = StyleSheet.create({
  textStyle:{
    fontSize:36,
    textAlign:'center',
    backgroundColor:'#FFFFFF',
    color:'#1874CD'
  },
  containers:{
    height:height/7,
    justifyContent: 'flex-end',
    alignItems:'center',
    backgroundColor:'#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonView: {

    alignItems:'center',
    flex: 3
  },
  inputView: {
    padding: 5,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent: 'center',
  },
  lineBottom: {
    borderBottomWidth: 5 / PixelRatio.get(),
    borderColor: 'rgb(208,208,208)'
  },
  button: {
    marginTop: 30,
    width:width*0.8,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#1874CD',
    justifyContent: 'center',
    alignItems:'center'
  },
  buttonText: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white',

  },
  text: {
    lineHeight: 44,
    fontSize: 14,
  },
  texts: {
    lineHeight: 44,
    fontSize: 16,
    color:'#1874CD'
  },
  view: {
    flexDirection: 'row',
    height: 44,
    width:width*0.8
  },
  textInputStyle: {
    flex: 5,
    marginRight: 10,
    marginLeft:20,
    fontSize: 16,
    marginTop: 4,

  },
  lineTopBottom: {
    borderBottomWidth: 3 / PixelRatio.get(),
    borderColor: 'rgb(208,208,208)',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
