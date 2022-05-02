import {connect} from 'react-redux';
import React, {useState, Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {updateProfile, getUserProfile} from '../../actions/profile';
import { Applicant } from '../../actions/types';


const EditProfile = ({updateProfile, auth, profile: {profile, loading}, getUserProfile}) => {
    
    const [formData, setFormData] = useState({
        name: '',
        skills: '',
        who: '',
        contactnumber: '',
        bio: '',
        email: ''
    });
    const  {
        email,
        name,
        skills,
        who,
        contactnumber,
        bio
    } = formData;

      useEffect(() => {
        getUserProfile();
        setFormData({
          name: loading || !profile.name  ? '' : profile.name,
          skills: loading || !profile.skills  ? '' : profile.skills,
          who: loading || !profile.who  ? '' : profile.who,
          contactnumber: loading || !profile.contactnumber  ? '' : profile.contactnumber,
          bio: loading || !profile.bio  ? '' : profile.bio,
          email: loading || !profile.email  ? '' : profile.email,
        });
    },[loading, getUserProfile]);
    
    if(auth.loading || !auth.user || loading || !profile)
    {
      return (<Fragment>Loading...</Fragment>)
    }
    // setFormData({who: auth.who});
    const onChange = (e) => {
        // console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    const onSubmit = (e) => {
        e.preventDefault();
        setFormData({ ...formData, email: auth.user.email});
        updateProfile(formData, {who});
    };
    
    return (
        <Fragment>
        <h1>Редагувати профіль</h1>
      <p><i className="fas fa-user"></i> Відредагуйте свій профіль</p>
      <form onSubmit={e => onSubmit(e)}>
        
        <div className="form-group">
        <label class="col-sm-3 control-label" for="nameid">Посада</label>
        <div class="col-sm-9">
          <input id="nameid" type="name" className="form-control" placeholder="*Name" name="name" value={name} onChange={e => onChange(e)} required/>
          </div>
        </div>
        {auth.user.who === Applicant ? <Fragment>
          <div className="form-group">
        <label class="col-sm-3 control-label" for="skillid">Навички</label>
        <div class="col-sm-9">
          <textarea rows="7" id="skillid" type="skills" className="form-control" placeholder="Skills" name="skills" value={skills} onChange={e => onChange(e)} />
        </div>
        </div>  
        </Fragment>: 
        <Fragment>
          <div className="form-group">
        <label class="col-sm-3 control-label" for="contactid">Номер телефону</label>
        <div class="col-sm-9">
          <input id="contactid" type="number" className="form-control" placeholder="*Mobile Number" name="contactnumber" value={contactnumber} onChange={e => onChange(e)} required/>
          </div>
        </div>
        <div class="form-group">
      <label class="col-sm-3 control-label" for="Textarea1">Біографія</label>
      <div class="col-sm-9">
      <textarea class="form-control" id="area1" rows="3" name="bio" value={bio} onChange={e => onChange(e)} required></textarea>
      </div>
    </div>
        </Fragment>
        }
        <input type="submit" className="btn btn-primary" value="Оновити профіль" />
      </form>
      </Fragment>
    )
}

EditProfile.propTypes = {

    updateProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state =>({
    auth: state.authReducer,
    profile: state.profile,
});
export default connect(mapStateToProps, {updateProfile, getUserProfile})(EditProfile); 
