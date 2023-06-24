import { supabaseClient } from "$lib/supabase";

export const saveJamToUserList = async (saved, jamID, userID) => {
	if (!saved) {
		const { error } = await supabaseClient.from('user_saved_jam_sessions').insert({
			jam_id: jamID,
			user_id: userID
		});
		if (error) console.error(error);
	} else {
		const { error } = await supabaseClient.from('user_saved_jam_sessions').delete().match({
			jam_id: jamID,
			user_id: userID
		});
		if (error) console.error(error);
	}
};

export const updateJamSession = async (jamID, data) => {
  console.log('finish this function');
};
