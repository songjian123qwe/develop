
// 切换各种弹窗显示隐藏的函数
export default function toggleModal(type, visible) {

    return () => {
        this.setState({
            [type]: visible
        });
    }
    
}
