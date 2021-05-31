
function NotoficationMessage(props) {

    const { type, message } = props;
    
    return (

        <p className={`${type}-notification`}>{message}</p>
    )
}

export default NotoficationMessage;