import React, {Component} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {ActivityIndicator, Carousel, Icon, SearchBar,Toast} from '@ant-design/react-native';
import {
  Container,
  Header,
  Title,
  Text,
  Content,
  Subtitle,
} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import IconMenu from '../widgets/IconMenu';
import * as action from '../../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import api from '../../network';

var {height, width} = Dimensions.get('window');
const cols = 3;
const vMargin = 20;
const cellWH = (width - 2 * vMargin - 15) / cols;
const hMargin = 25;
let self;
class deal extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.navigation = props.navigation;
    this.state={
      value: '',
    }
    this.onChange = value => {
      this.setState({ value });
    };
    this.clear = () => {
      this.setState({ value: '' });
    };
  }
  componentDidMount() {
    // 隐藏启动页，如果不设置消失时间，在组件加载完启动页自动隐藏
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);

    api.setHost();
    const {actions} = this.props;

    const params = {
      limit: '6',
      order: 'hot',
    }
    actions.GetPlaylist(params);

    const parames = {
      type: '1',
    }
    actions.GetBannerList(parames);
  }

  static headersFind = {
    header: null,
  };

  static navigationOptions = {
    title: '发现',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="team" size={25} color={tintColor} />
    ),
  };
  onPressPersonFM() {
    Toast.success('后续开发中', 1);
  }
  onPressMusicRank() {
    Toast.success('后续开发中', 1);
  }
  onPressHotMusic() {
    Toast.success('后续开发中', 1);
  }
  onChange = value => {
    this.setState({value});
  }

  onPressSongSheet(id){
    const{navigation}=this.props;

    if(navigation){
      navigation.navigate('Player',{songid:id,id:1})
    }
  }

  renderItem({item, index}) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          self.onPressSongSheet(item.songid);
        }}>
        <View style={styles.item}>
          <Image
            source={{uri: item['image']}}
            style={{width: cellWH, height: cellWH, borderRadius: 2}}
          />
          <View
            style={{
              zIndex: 999,
              width: 80,
              height: 24,
              position: 'absolute',
              right: 2,
              top: 2,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                right: 5,
                top: 2,
                position: 'absolute',
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              {item.share}万
            </Text>
          </View>
          <Icon
            name="right-circle"
            style={{
              right: 5,
              top: cellWH - 30,
              position: 'absolute',
              color: 'white',
            }}
          />
          <Text style={{marginTop: 5, textAlign: 'center'}} numberOfLines={2}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {state} = this.props;
    const {single, banner} = state;
    var data = null;
    if (single != null) {
      data = Array.from(new Array(6)).map((_val, i) => ({
        image: single.playlists[i].creator.backgroundUrl,
        title: single.playlists[i].name,
        songid: single.playlists[i].id,
        share: (single.playlists[i].playCount / 10000).toFixed(2),
      }));
    }
    let bannerItems=null;
    let listBanner=[];
    if (banner != null) {
      bannerItems = banner.banners.map((item,index) =>
        <View style={styles.containerHorizontal} >
          <Image
            source={{uri: item['pic']}}
            style={styles.banners}
          />
        </View>
      );
    }else{
      bannerItems = listBanner.map((item,index) =>
        <View style={styles.containerHorizontal} >
          <ActivityIndicator  />
        </View>
      );
    }
    return (
      <Container>
        <Header  rounded >
          <View>
            <Title> zyz's music</Title>
            <Subtitle>qq:1204383390</Subtitle>
          </View>
        </Header>
        <View >
          <SearchBar
            value={this.state.value}
            placeholder="搜索"
            onSubmit={value => Alert.alert(value)}
            onCancel={this.clear}
            onChange={this.onChange}
            showCancelButton
          />
        </View>
        <Content>
          <Carousel
            style={styles.wrapper}
            selectedIndex={2}
            autoplay
            infinite
            afterChange={this.onHorizontalSelectedIndexChange}
          >
            {bannerItems}
          </Carousel>
          <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', height: width / 4}}>
            <TouchableOpacity onPress={() => this.onPressPersonFM()}>
              <IconMenu icon="md-calendar" title="每日推荐" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressPersonFM()}>
              <IconMenu icon="md-musical-notes" title="歌单" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressPersonFM()}>
              <IconMenu icon="md-stats" title="排行榜" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressMusicRank()}>
              <IconMenu icon="md-radio" title="电台" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressHotMusic()}>
              <IconMenu icon="md-desktop" title="直播" />
            </TouchableOpacity>
          </View>
          <View style={[{margin: 10}]}>
            <Text>推荐音乐></Text>
          </View>
          <View style={styles.container}>
            <FlatList
              data={data}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index}
              contentContainerStyle={styles.list_container}
            />
          </View>
        </Content>
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
)(deal);
const styles = StyleSheet.create({
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  banners: {
    width: width - 20,
    height: 150,
  },
  wrapper: {
    marginTop: 3,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 15,
  },
  list_container: {
    // 主轴方向
    flexDirection: 'row',
    justifyContent: 'space-between',
    // 一行显示不下,换一行
    flexWrap: 'wrap',
    // 侧轴方向
    alignItems: 'center', // 必须设置,否则换行不起作用
    paddingHorizontal: 10,
  },
  item: {
    width: cellWH,
    marginTop: 5,
    alignItems: 'center',
  },
});
