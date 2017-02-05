/* 选择器组件 */
import React, {Component} from 'react'
import {View, ScrollView, KeyboardAvoidingView, TouchableHighlight, Text, Modal, StyleSheet} from 'react-native'

import TextInputGroup from './TextInputGroup'
// 引入通用控件组件
import Icon from 'react-native-vector-icons/Entypo'
// 引入常量或工具
import {flatColor} from '../../utilities/styleTools'

// 定义组件样式
const styles = StyleSheet.create({
  wrap: {
    flex: 1, 
    flexDirection: 'column'
  },
  listWrap: {
    flexDirection: 'column',
    marginVertical: 12
  },
  primaryButton: {
    flex: 1,
    height: 32,
    marginHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: flatColor.WHILE
  },
  primaryButtonText: {
    alignSelf: 'center',
    fontSize: 16,
    color: flatColor.ASBESTOS
  },
  tipText: {
    marginTop: 4, 
    alignSelf: 'center', 
    fontSize: 12, 
    color: flatColor.SILVER
  },
  rowWrap: {
    height: 48,
    backgroundColor: flatColor.WHILE,
    flexDirection: 'row',
    borderBottomColor: flatColor.CLOUDS,
    borderBottomWidth: 1
  },
  label: {
    fontSize: 16,
    paddingLeft: 18,
    paddingRight: 6,
    color: flatColor.WET_ASPHALT
  },
  iconButton: {
    alignSelf: 'center', 
    fontSize: 20
  },
  touchRight: {
    flex: 1,
    justifyContent: 'center'
  },
  touchLeft: {
    width: 64,
    justifyContent: 'center',
    borderLeftColor: flatColor.CLOUDS,
    borderLeftWidth: 2
  }
})

// 创建组件
export default class ItemsEditGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
      list: [],
      curEditItem: '',
      curEditIndex: -1
    }
    this._addItem = this._addItem.bind(this)
    this._updateItem = this._updateItem.bind(this)
    this._removeItem = this._removeItem.bind(this)
    this._showEditModal = this._showEditModal.bind(this)
    this._hideEditModal = this._hideEditModal.bind(this)
  }
  _removeItem (currentIndex) {
    let newList = this.state.list.slice()
    newList.splice(currentIndex, 1)
    this.props.settingUpdate({MORE_CITIES: newList})
    // this.setState({list: newList})
  }
  _addItem (newItem) {
    if (this.state.list.length >= 4) {
      this.props.systemMsgPush({mid: 'SETTING_LOG', message: 'Can not add more than 4 cities'})
      return
    }
    let newList = this.state.list.slice()
    newList.push(newItem)
    this.props.settingUpdate({MORE_CITIES: newList})
    // this.setState({list: newList})
  }
  _updateItem (currentItem, currentIndex) {
    
    let newList = this.state.list.map((item, index) => item = currentItem && index === currentIndex ? currentItem : item)
    this.props.settingUpdate({MORE_CITIES: newList})
    // this.setState({list: newList})
  }
  _showEditModal (curEditItem, currentIndex) {
    this.setState({
      modalVisible: true,
      curEditItem: curEditItem || '',
      currentIndex: currentIndex || -1
    })
  }
  _hideEditModal () {
    this.setState({
      modalVisible: false,
      currentItem: '',
      currentIndex: -1
    })
  }
  componentWillMount () {
    this.setState({
      list: this.props.itemsList
    })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      list: nextProps.itemsList
    })
  }
  render () {
    return (
      <View style={styles.wrap}>
        <View style={styles.listWrap}>
          <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            onPress={() => {this._showEditModal()}}
            style={styles.primaryButton}
            underlayColor={flatColor.TURQUOISE}
          >
            <Text style={styles.primaryButtonText}>
              {this.props.addButtonTitle || 'ADD'}
            </Text>
          </TouchableHighlight>
          </View>
          {
            this.props.tipText ? (<Text style={styles.tipText}>{this.props.tipText}</Text>) : null
          }
        </View>
        <ScrollView ref='mcList'>
          {
            this.state.list.map((item, index) => (
              <View key={index} style={styles.rowWrap} itemVal={item}>
                <TouchableHighlight 
                  style={styles.touchRight} 
                  underlayColor={flatColor.TURQUOISE}
                  onPress={() => {this._showEditModal(item, index)}}
                >
                  <Text style={styles.label}>{item}</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                  style={styles.touchLeft} 
                  underlayColor={flatColor.WET_ASPHALT}
                  onPress={() => {this._removeItem(index)}}
                >
                  <Icon name='cross' style={styles.iconButton} color={flatColor.SILVER} />
                </TouchableHighlight>
              </View>
            ))
          }
        </ScrollView>
        <Modal
          animationType={'fade'} 
          transparent={true}
          visible={this.state.modalVisible}
        >
          <KeyboardAvoidingView 
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, .7)'
            }}
            behavior={'height'}
          >
          <View style={{backgroundColor: flatColor.SILVER,  marginHorizontal: 24}}>
          <View style={{
            height: 48
          }}>
          <TextInputGroup 
            ref='cityInput'
            textInputProps={{
              placeholder: 'Enter a city name',
              defaultValue: this.state.curEditItem,
              onSubmitEditing: (event) => {
                if (event.nativeEvent.text) {
                  if (this.state.currentIndex >= 0) {
                    this._updateItem(event.nativeEvent.text, this.state.currentIndex)
                  } else {
                    this._addItem(event.nativeEvent.text)
                  }
                }
                this._hideEditModal()
              }
            }}
          />
          </View>
          <View style={{paddingVertical: 8, flexDirection: 'row'}}>
            <TouchableHighlight
              style={styles.primaryButton}
              underlayColor={flatColor.TURQUOISE}
              onPress={() => {this._hideEditModal()}}
            >
              <Text style={styles.primaryButtonText}>
                Cancel
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.primaryButton}
              underlayColor={flatColor.TURQUOISE}
              onPress={() => {
                try {
                  let cityInput = this.refs['cityInput']
                  let elmTextInput = cityInput.refs['elmTextInput']
                  let lastNativeText = elmTextInput._lastNativeText
                  if (lastNativeText) {
                    if (this.state.currentIndex >= 0) {
                      this._updateItem(lastNativeText, this.state.currentIndex)
                    } else {
                      this._addItem(lastNativeText)
                    }
                  }
                } catch (error) {
                }
                this._hideEditModal()
              }}
            >
              <Text style={styles.primaryButtonText}>
                OK
              </Text>
            </TouchableHighlight>
          </View>
          </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
      
    )
  }
}

