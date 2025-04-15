#!/bin/bash

function postMovie() {
  JSON_STRING=$(jq -n \
                  --arg title "$1" \
                  --arg release_date "$2" \
                  --arg poster_path "$3" \
                  --arg overview "$4" \
                  '{title: $title, release_date: $release_date, poster_path: $poster_path, overview: $overview}'
  )
  curl -L http://localhost:8080/api/movies/new \
    --request POST \
    --header "Content-Type: application/json" \
    --data "$JSON_STRING"
  echo ' -- OK'
}
postMovie "In the Lost Lands" "2025-02-27" "/iHf6bXPghWB6gT8kFkL1zo00x6X.jpg" "A queen sends the powerful and feared sorceress Gray Alys to the ghostly wilderness of the Lost Lands in search of a magical power where the sorceress and her guide the drifter Boyce must outwit and outfight man and demon."
postMovie "A Minecraft Movie" "2025-03-31" "/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg" "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre cubic wonderland that thrives on imagination. To get back home they'll have to master this world while embarking on a magical quest with an unexpected expert crafter Steve."
postMovie "G20" "2025-04-09" "/tSee9gbGLfqwvjoWoCQgRZ4Sfky.jpg" "After the G20 Summit is overtaken by terrorists President Danielle Sutton must bring all her statecraft and military experience to defend her family and her fellow leaders."
postMovie "Novocaine" "2025-03-12" "/xmMHGz9dVRaMY6rRAlEX4W0Wdhm.jpg" "When the girl of his dreams is kidnapped everyman Nate turns his inability to feel pain into an unexpected strength in his fight to get her back."
postMovie "Gunslingers" "2025-04-11" "/O7REXWPANWXvX2jhQydHjAq2DV.jpg" "When the most wanted man in America surfaces in a small Kentucky town his violent history -- and a blood-thirsty mob seeking vengeance and a king’s ransom -- soon follow. As brothers face off against one another and bullets tear the town to shreds this lightning-fast gunslinger makes his enemies pay the ultimate price for their greed."
postMovie "Captain America: Brave New World" "2025-02-12" "/4YFyYcUPfrbpj6VpgWh7xoUnwLA.jpg" "After meeting with newly elected U.S. President Thaddeus Ross Sam finds himself in the middle of an international incident. He must discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red."
postMovie "The Hard Hit" "2023-10-20" "/whkFbOZTamHeugEG95jvQehSzAH.jpg" "An Interpol agent hunting the head of a global crime syndicate tracks his target to Las Vegas but when the criminal organization kills his wife and daughter he goes above the law to get his revenge."
postMovie "Cleaner" "2025-02-19" "/mwzDApMZAGeYCEVjhegKvCzDX0W.jpg" "When a group of radical activists take over an energy company's annual gala seizing 300 hostages an ex-soldier turned window cleaner suspended 50 storeys up on the outside of the building must save those trapped inside including her younger brother."
postMovie "देवा" "2025-01-31" "/qxtXzAlEPxmjHILU8k8wduvBSdo.jpg" "Dev Ambre a ruthless cop loses his memory in an accident just after he has finished solving a murder case and now has to reinvestigate it while keeping his memory loss a secret from everyone except DCP Farhan Khan."
postMovie "Carjackers" "2025-03-27" "/wbkPMTz2vVai7Ujyp0ag7AM9SrO.jpg" "By day they're invisible—valets hostesses and bartenders at a luxury hotel. By night they're the Carjackers a crew of skilled drivers who track and rob wealthy clients on the road. As they plan their ultimate heist the hotel director hires a ruthless hitman to stop them at all costs. With danger closing in can Nora Zoe Steve and Prestance pull off their biggest score yet?"
postMovie "Mickey 17" "2025-02-28" "/edKpE9B5qN3e559OuMCLZdW1iBZ.jpg" "Unlikely hero Mickey Barnes finds himself in the extraordinary circumstance of working for an employer who demands the ultimate commitment to the job… to die for a living."
postMovie "Turno nocturno" "2024-10-31" "/iSSx9Bys64vlOkvkyKXtp19P7Re.jpg" "A young nurse with a domestic abuse past starts working the night shift at a small hospital where during the night the ghost of a nurse materializes."
postMovie "Moana 2" "2024-11-21" "/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg" "After receiving an unexpected call from her wayfinding ancestors Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous long-lost waters for an adventure unlike anything she's ever faced."
postMovie "The Codes of War" "2025-03-20" "/oXeiQAfRK90pxxhP5iKPXQqAIN1.jpg" "War stories about family ethics and honor include the true story of two U.S. Marines who in a span of six seconds must stand their ground to stop a suicide truck bomb a Navy Corpsman who attempts to hold on to his humanity and a WW2 soldier who gets separated from his squad and is forced to re-evaluate his code."
postMovie "Pídeme lo que quieras" "2024-11-29" "/76qnVxU2rPdVvipBN3DPQH6fVYB.jpg" "After his father's death Eric Zimmerman travels to Spain to oversee his company's branches. In Madrid he falls for Judith and engage in an intense erotic relationship full of exploration. However Eric fears his secret may end their affair."
postMovie "Mufasa: The Lion King" "2024-12-18" "/lurEK87kukWNaHd0zYnsi3yzJrs.jpg" "Mufasa a cub lost and alone meets a sympathetic lion named Taka the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny."
postMovie "825 Forest Road" "2025-04-04" "/ohESp5Nw49OD4ExCeNYCEIGX2iq.jpg" "After a family tragedy Chuck Wilson hopes to start a new life in Ashland Falls with his wife Maria and little sister Elizabeth but he quickly discovers that the town has a dark history of being haunted by a ghostly woman who drives residents to suicide."
postMovie "De lydløse" "2024-10-31" "/7NLY1jNwtZX1yVzwVoBeAhaBE8i.jpg" "In 2008 a group of men from Denmark and across Europe pull off the biggest heist of all time on Danish soil. Kasper a boxer with few chances left in life is offered the opportunity to plan the robbery by its foreign initiators."
postMovie "Sonic the Hedgehog 3" "2024-12-19" "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg" "Sonic Knuckles and Tails reunite against a powerful new adversary Shadow a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet."
postMovie "Cosmic Chaos" "2023-08-03" "/mClzWv7gBqgXfjZXp49Enyoex1v.jpg" "Battles in virtual reality survival in a post-apocalyptic wasteland a Soviet spaceship giving a distress signal - Fantastic stories created with advanced special effects and passion."
echo "All done."