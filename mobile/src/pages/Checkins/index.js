import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SCheckins, SCheckin, SCheckinId, SCheckinTime } from './styles';

import Button from '~/components/Button';
import Header from '~/components/Header';
import { SGlobalContainer, SEmptyContainer } from '~/styles/global';

import CheckinActions from '~/store/ducks/checkin';

export default function Checkins() {
    const dispatch = useDispatch();

    // const refreshing = useState(false);
    const student = useSelector(state => state.auth.user);
    const checkins = useSelector(state => state.checkin.checkins || []);

    function handleLoadCheckins() {
        dispatch(CheckinActions.checkInsRequest(student.id));
    }

    useEffect(() => {
        handleLoadCheckins();
    }, []);

    async function handleNewChekin() {
        dispatch(CheckinActions.checkInRequest(student.id));
    }

    return (
        <>
            <Header />
            <SGlobalContainer>
                <Button onPress={handleNewChekin}>
                    {'new check-in'.toUpperCase()}
                </Button>

                <SCheckins
                    data={checkins}
                    keyExtractor={checkin => String(checkin.id)}
                    renderItem={({ item }) => (
                        <SCheckin>
                            <SCheckinId>{item.formattedId}</SCheckinId>
                            <SCheckinTime>{item.formattedTime}</SCheckinTime>
                        </SCheckin>
                    )}
                    refreshing={!checkins}
                    onRefresh={handleLoadCheckins}
                    ListEmptyComponent={
                        <SEmptyContainer>
                            There are no checkin done before this week!
                        </SEmptyContainer>
                    }
                />
            </SGlobalContainer>
        </>
    );
}
