import React from 'react';
import { useAppAccessor } from "../../hooks";
import { TrackList, NoResultFound } from '../../components';

export default function SRPATrackList() {

  const { getHome }= useAppAccessor();
  const {
    loading,
    tracks,
  } = getHome();

  return (
    <>
      { (!loading && (tracks ?? []).length===0 )&& <NoResultFound /> }
      <TrackList {...{tracks}} fromSearch={true} />
    </>
  )
}