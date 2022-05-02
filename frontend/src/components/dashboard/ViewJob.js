import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { loadJobWithId, editJob } from '../../actions/jobs';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';
import DisplayRecruiterSide from './DisplayRecruiterSide';
import {getApplicationsById} from '../../actions/applications';
import "../../static/style.css"


const ViewJob = ({match, jobs: {cjob, loading}, editJob, loadJobWithId, applicationjobs, getApplicationsById}) => {
    const id = match.params.id;
    useEffect(()=>{
        loadJobWithId(id);
        getApplicationsById(id);
    },[]);
    
    if(!cjob || loading || applicationjobs.loading){
      return <Fragment>Loading.....</Fragment>
    }
    const {
        title,
            applications,
            positions,
            deadline,
            skills,
            typeOfJob,
            duration,
            salary,
            date_of_posting
    } = cjob;
    return (
        <Fragment>
        <h1>Робота</h1>
        <table className='table'>

    <div class="job-post--title-wrapper">
       <h1>
       {title}
       <span class="public-salary-item"> ${salary}</span>
       </h1>
    </div>

    <div class="page-header">
<div class="list-jobs__details">
        <a href="#" class="picture">
            <div class="recruiter-images-container">
                <div id class="userpic-wrapper userpic-color_0 userpic_sm ">
                    <span class="userpic-initials"></span>
                    <div class="userpic-image"></div>
                </div>
            </div>
        </a>
        <div class="list-jobs__details__info">
        <li>Кількість заявок: {applications} Кількість посад: {positions} Дата розміщення: {moment(date_of_posting).format('LLL')} Дедлайн подачі заявки: {moment(deadline).format('LLL')} Тип роботи: {typeOfJob} Тривалість: {duration}</li>
        </div>           
    </div>
    </div>


    <div class="profile-page-section">{skills}</div>
    
    
    <p class="text-danger">
    <Link className='btn btn-default btn-xs' to={`/editjob/${id}`} >Редагувати вакансію</Link>
    </p>   
    
</table>
        <h2>Заявки на цю роботу</h2>

        <DisplayRecruiterSide applicationjobs={applicationjobs.applications}/>
        </Fragment>
    )
}

ViewJob.propTypes = {
    jobs: PropTypes.object.isRequired,
    editJob: PropTypes.func.isRequired,
    loadJobWithId: PropTypes.func.isRequired,
    getApplicationsById: PropTypes.func.isRequired,
    applicationjobs: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    jobs: state.jobs,
    applicationjobs: state.applications
});

export default connect(mapStateToProps, {editJob, loadJobWithId, getApplicationsById})(ViewJob);
