export const getColor = () => {
    let div = document.createElement('div');
    div.style.height = 0;
    div.className = 'header';

    document.body.appendChild(div);

    let bgColor = window.getComputedStyle(div).backgroundColor;

    document.body.removeChild(div);
    let color =  isBlackBg()? '#aeaeae' : '#000';

    return {
        bgColor: bgColor,
        color: color
    };
}

// 判断是否为暗黑色背景
export const isBlackBg = ()=>{
    return document.body.className.includes('nc-lightapp-front-black')
}

export const handleHash = (date, content) => (WrappedComponent) => {
    if (/^localhost|127\.0\.0\.1/.test(window.location.hostname)) {
        return class extends React.Component {
            componentWillMount() {
                setAppUrl(date, content)
            }

            render() {
                return <WrappedComponent {...this.props} />
            }
        }
    } else {
        return class extends React.Component {
            render() {
                return <WrappedComponent {...this.props} />
            }
        }
    }
}
