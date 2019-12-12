import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SectionList
} from 'react-native';
import * as action from '../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActivityIndicator} from '@ant-design/react-native';
import {commonStyle} from '../player/commonStyle'
import {Icon} from '../icon'
import  {Normal,Tip,H3}  from '../widgets/TextTool';
import { Container, Header, Left, Body, Right, Button,Icon as Icons, Title, Fab } from 'native-base';
import  Avatar from '../widgets/Avatar';
import  IconWidget from '../widgets/IconWidget';


var {height,width} =  Dimensions.get('window');
var mockData=null;
class LoveMusic extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state={
      musicInfo:null,
      loading:false,
      refreshing: true,
      dataList: [],
    }
  }
  componentDidMount() {
    const{actions}=this.props;
    var index=this.props.navigation.state.params.id;
      const params = {
        id: index,
      }
      actions.GetPlaylistdetail( params,(succecd,data)=>{
        this.setState({
          musicInfo:data.playlist.tracks
        },()=>{
          this.setState({
            loading:false,
            dataList:this.state.musicInfo.map(v => ({...v, title: v.name + ((v.alia && v.alia.length > 0) ? `(${v.alia})` : ''), subTitle: (v.ar || v.artists).map(a => a.name).join('、') + ' - ' + (v.al || v.album).name})),
          })
        })
        if(!succecd){
          message.error(data)
        }
      });
  }
  static navigationOptions = {
    header:null,
    gesturesEnabled: false,
    // headerStyle: {
    //     backgroundColor: 'red'
    // },
  };
  onPressBack(){
    const{navigation}=this.props;
    if(navigation){
      navigation.goBack();
    }
  }
  requestDetail = () => {
  };
  playSong(item){
    const { navigation } = this.props;
    // console.log(item)
    var list=new Array();
    list[0]=item;
    navigation.navigate('PlayList',{list:list})
  };
  playSongList(list){
    // const { navigation } = this.props;
    // navigation.navigate('PlayList',{list:list.songs})
  }
  scrollToLocation = (params) => {
    console.log("scrollToLocation======>>>"+params)
  };
  toUserPage = id => {
    console.log("toUserPage=======>>>"+id);
    // this.props.navigation.navigate('UserDetail', {id})
  };
  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Image source={{uri: this.state.musicInfo[0].al.picUrl}} resizeMode="cover" style={[styles.bg, {top: -50, height: width * 0.6 + 50,}]} blurRadius={4} />
        <View style={{ alignItems: 'center', paddingLeft: 10, backgroundColor: 'transparent'}}>
          <View style={{flex: 1, marginLeft: 15, height: '80%'}}>
            <H3 style={{paddingTop: 15, paddingBottom: 10}} color={commonStyle.white}>我喜欢的音乐</H3>
          </View>
        </View>

      </View>
    )
  };
  renderItem = ({item, index}) => {
    return (
      <View style={{height: 50, width: width, flexDirection: 'row', paddingLeft: 10, alignItems: 'center'}}>
        <View style={{ width: 25, justifyContent: 'center', alignItems: 'center'}}>
          {
            <Tip title={index + 1} style={{fontSize: 12}} />
          }
        </View>
        <View style={{flex: 1, flexDirection: 'row',alignItems: 'center', height: '100%', marginLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderColor: '#F0F0F0'}} >
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => this.playSong(item)}>
              <Normal numberOfLines={1} style={{fontSize: 14}} color={'black'}>{item.title}</Normal>
              <Tip title={item.subTitle}  color={'black'} numberOfLines={1} />
            </TouchableOpacity>
          </View>
          <View style={{width: 60, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Icon name={'oneIcon|menu_h_o'} size={20} />
          </View>
        </View>
      </View>
    )
  };
  sectionHeader = () => (
    <View style={{height: 50, width: width, flexDirection: 'row', paddingLeft: 10, alignItems: 'center', backgroundColor: '#ffffff'}}>
      <View style={{width: 25, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => this.playSongList(this.state.musicInfo)}><Icon name={'oneIcon|music_playing_s'} size={20} /></TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: 'row',alignItems: 'center', height: '100%', marginLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderColor: '#F0F0F0'}} >
        <Text>播放全部</Text>
        <Normal title={`（共${this.state.musicInfo.length}首）`} />
        <View style={{flex: 1}} />
        <Icon name={'oneIcon|menu_h_o'} size={20} />
      </View>
    </View>
  );
  scrollToIndex = (params) => {   // flatlist滚到顶部
    alert(JSON.stringify(params))
  };

  render() {

    return (
      this.state.musicInfo !=null?<Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.onPressBack()}>
              <Icons name='arrow-back' />
            </Button>
          </Left>
          <Body>
          </Body>
          <Right>
              <Icon name={'oneIcon|share_o'} size={20} color={commonStyle.white}/>
          </Right>
        </Header>
        <SectionList
          style={{backgroundColor: '#fff'}}
          refreshing={this.state.refreshing}
          keyExtractor={(item, index) => index}
          sections={[{key: '1', data: this.state.dataList}]}
          renderItem={this.renderItem}
          renderSectionHeader={this.sectionHeader}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载完全部数据</Text>}
          stickySectionHeadersEnabled
          scrollToLocation={this.scrollToLocation}
        />
      </Container>:<View style={styles.othercontainer}><ActivityIndicator text="正在加载" /></View>
    );
  }
}

export default connect(state => ({
  state: state.user
}), (dispatch) => ({
  actions: bindActionCreators(action.user, dispatch)
}))(LoveMusic);

const styles = StyleSheet.create({
  bgContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: height,
    width: width,
  },
  navBarStyle: {
    position: 'absolute',
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    width: width,
    height: height/11,
    // borderBottomWidth:1,
    borderBottomColor:'black',
  },
  navBarContent:{
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: 10
  },
  othercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: commonStyle.black,
    fontSize: 14
  },
  subTitle: {
    color: commonStyle.black,
    fontSize: 11,
    marginTop: 5
  },
  header: {
    height: width * 0.2,
    width: width,
    backgroundColor: '#777777',
  },
  bg: {
    position: 'absolute',
    top: 0,
    opacity: 0.3,
    height: width * 0.6,
    width:width,
  },
});
