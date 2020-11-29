import service from '../../services/ComunityServices';

const loadData = data => ({ type: 'getData', data: data})

const getData = () => dispatch => //service.getData().then(({data}) => dispatch(loadData(data))).catch(error => console.log(error))
                                    dispatch(loadData(service.getData()))

export default { getData }