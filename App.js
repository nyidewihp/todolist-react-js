import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title:'MY TODO LIST',
      act:0,
      index:'',
      data:[] //array of data
    }
  }

  componentDidMount(){
    this.refs.title.focus(); //menetapkan field title sebagai elemen aktif yg pertama kali saat refresh
  }

  handleBatal=(e)=>{
    e.preventDefault();
    alert("Aktivitas Tidak Tersimpan!")

  }

  handleSimpan=(e)=>{
    e.preventDefault();
    // alert("Aktivitas Tersimpan");

    let data = this.state.data;
    let date = this.refs.date.value;
    let title = this.refs.title.value;
    let activity = this.refs.activity.value;

    if(this.state.act===0){
      let ToDo={
        date, title, activity
      }
      data.push(ToDo);
    }else{
      let index=this.state.index;
      data[index].date=date;
      data[index].title=title;
      data[index].activity=activity;
    }

    this.setState({
      data:data,
      act:0
    });

    // console.log(this.state.data);
    this.refs.MyForm.reset(); //mengatur ulang value semua field dalam form
    this.refs.title.focus();
  }

  handleDelete=(i)=>{
    let data=this.state.data;

    data.splice(i,1); //menempatkan posisi i untuk menghapus dan jumlah item yg dihapus sebanyak 1 item
    this.setState({
      data:data,
    });
    this.refs.MyForm.reset();
    this.refs.title.focus();
  }

  handleEdit=(i)=>()=>{
    let ToDo=this.state.data[i];
    // console.log(ToDo);
    this.refs.date.value = ToDo.date;
    this.refs.title.value = ToDo.title;
    this.refs.activity.value = ToDo.activity;
  
    this.setState({
      act:1,
      index:i
    });

    this.refs.title.focus();
  }

  render(){
    let data=this.state.data;
    this.handleDelete = this.handleDelete.bind(this);
    return (
    <div className="container">
      <center><h2>{this.state.title}</h2></center>
      <form ref="MyForm" className="MyForm">
        <div>
          <label>Pilih Tanggal</label>
          <br></br>
          <input 
            ref="date"
            type="date"
            className="form-group"
          />
        </div>
        <div>
          <label>Judul</label>
          <input
            ref="title"
            type="text"
            placeholder='Enter title'
            className="form-control"
          />
        </div>
        <div>
          <label>Aktivitas</label>
          <input
            ref="activity"
            type="text"
            placeholder='What will you do?'
            className="form-control"
          />
        </div>
        <center style={{paddingTop:5}}><button onClick={this.handleBatal} className="BatalButton">Batal</button>
          &nbsp;<button onClick={this.handleSimpan} className="SimpanButton">Simpan</button></center>
      </form>
      <table className="table table-striped" style={{marginTop: 20}}>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Judul</th>
            <th>Aktivitas</th>
            <th colSpan="2">Action</th>
          </tr>      
        </thead>
        <tbody>
        {
          data.map((ToDo,i)=>
          <tr>
            <td key={i}> 
                {ToDo.date}</td>
            <td>{ToDo.title}</td>
            <td>{ToDo.activity}</td>
            <td><button onClick={this.handleEdit(i)} className="btn btn-info">Edit</button>
                &nbsp;
                <button 
                  className="btn btn-danger" 
                  onClick={() => {
                    if(window.confirm('Are you sure to delete?')){
                      this.handleDelete(i)
                    };
                  }}
                  >Hapus
                </button>
            </td>
          </tr>
          )
        }
        </tbody>
      </table>
    </div>
  );
  } 
}

export default App;
