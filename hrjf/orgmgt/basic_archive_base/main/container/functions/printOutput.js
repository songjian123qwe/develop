export default function printOutput() {
    const {appcode, pk_postseries} = this.props;

    const printData = {
        filename: this.props.json['jf6005-000219'] + "-" + (appcode === '60054010' ? this.props.json['jf6005-000147'] : this.props.json['jf6005-000327']),
        funcode: '60054010',     //功能节点编码，即模板编码
        appcode: '60054010',
        nodekey: 'fmprint',
        oids: [pk_postseries],   // 单据pk  oids含有多个元素时为批量打印,
        outputType: 'output'
    };

    this.setState({printData}, () => {
        this.refs.printOutput.open();
    });
}
