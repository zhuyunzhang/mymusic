import React, {Component } from 'react';
import { Dimensions,View,TextInput,TouchableOpacity,Text,StyleSheet,PixelRatio} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Fab } from 'native-base';
import * as action from '../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Toast from "react-native-root-toast";
import local from '../../store/storage';
var {height, width} = Dimensions.get('window');

class login extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      username: '',
      password: '',
      active: false
    };
  }
  componentDidMount() {
  }

  static navigationOptions = {
    header:null,
  };

  onPressLogin() {
    if(!(/^1[3456789]\d{9}$/.test(this.state.username))){
      Toast.show("手机号码有误，请重填", {
        duration: 1000, // toast显示时长
        position: height/3, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
      });
    }else {
      const {actions} = this.props;
      const param = {
        phone: this.state.username,
        password:this.state.password,
      }
      actions.GetLogin( param,(succecd,data)=>{
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
          local.set("loginData", data)
          const{navigation}=this.props;
          if(navigation){
            navigation.goBack();
            navigation.state.params.refresh();
          }
          return Toast.show('登录成功', {
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
  onRegisterPage(){
    const{navigation}=this.props;
    if(navigation){
      navigation.navigate('Register')
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
            <Title>登录</Title>
          </Body>
          <Right/>
        </Header>
        <View style={styles.container}>
          <View style={styles.containers}>
            <Text style={styles.textStyle}>登录页面</Text>
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
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onPressLogin()}
            >
              <Text style={styles.buttonText}>登   录</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Fab
            direction="right"
            position="bottomRight"
            onPress={() => this.onRegisterPage()}
          >
            <Icon name="add-circle" />
          </Fab>
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
)(login);
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
