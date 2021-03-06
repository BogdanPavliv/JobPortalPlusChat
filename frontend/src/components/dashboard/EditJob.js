import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { loadJobWithId, editJob } from '../../actions/jobs';
import {connect} from 'react-redux';


const EditJob = ({match, jobs: {cjob, loading}, editJob, loadJobWithId}) => {
    const id = match.params.id;
    // console.log(id);
    const [formData, setFormData] = useState({
            applications: '',
            positions: '',
            deadline: '',
      });
      
    const {
        applications,
        positions,
        deadline,
    } = formData;
    useEffect(()=>{
        loadJobWithId(id);
        setFormData({
            applications: loading || !cjob || !cjob.applications ? '' : cjob.applications,
            positions: loading || !cjob || !cjob.positions  ? '' : cjob.positions,
            deadline: loading || !cjob || !cjob.deadline ? '' : cjob.deadline,
        });
    },[loading, loadJobWithId]);
    
    if(!cjob || loading){
      return <Fragment>Loading.....</Fragment>
    }
    // console.log(deadline);
        const onChange = (e) => {
            // console.log(e.target.value);
            setFormData({ ...formData, [e.target.name]: e.target.value});
          };
      
        const onSubmit = (e) => {
            e.preventDefault();
            editJob({...formData,...{id}});
          }
    return (
        <Fragment>
        <h1>Редагувати відомості про роботу</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group1">
        <label class="col-sm-4 control-label" for="id1">Кількість кандидатів</label>
           <div class="col-sm-8">
          <input type="number" class="form-control" placeholder="number of applications" autofocus name="applications" min='0' value={applications} onChange={e => onChange(e)} required />
          </div>
        </div>

        <div className="form-group1">
        <label class="col-sm-4 control-label" for="id1">Кількість позицій</label>
           <div class="col-sm-8">
          <input type="number" class="form-control" placeholder="number of positions" autofocus name="positions" min='0' value={positions} onChange={e => onChange(e)} required />
          </div>
        </div>

        <div className="form-group1">
        <label class="col-sm-4 control-label" for="id1">Дедлайн подачі заявок</label>
          <div class="col-sm-8">
          <input type="datetime-local" class="form-control" placeholder="deadline" autofocus name="deadline"  value={deadline} onChange={e => onChange(e)} required />
          </div>
        </div>

        <input type="submit" class="btn btn-success js-send-btn js-publish-btn" name="post_job" value="Опублікувати вакансію" />
      </form>
        </Fragment>
    )
}

EditJob.propTypes = {
    jobs: PropTypes.object.isRequired,
    editJob: PropTypes.func.isRequired,
    loadJobWithId: PropTypes.array,
}

const mapStateToProps = state => ({
    jobs: state.jobs,
});

export default connect(mapStateToProps, {editJob, loadJobWithId})(EditJob);
