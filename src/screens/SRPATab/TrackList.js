import React from 'react';
import { useAppAccessor } from "../../hooks";
import { TrackList } from '../../components';

export default function SRPATrackList() {

  const { getHome }= useAppAccessor();
  const {
    tracks,
  } = getHome();

  return (
    <TrackList {...{tracks}} />
  )
}