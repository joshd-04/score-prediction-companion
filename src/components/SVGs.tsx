export function CheckCircleSVG({
  fillColor = '#5f6368',
}: {
  fillColor?: string;
}) {
  // prettier-ignore
  return <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill={fillColor}><path d="m421-298 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg>
}

export function DeleteSVG({
  fillColor = '#5f6368',
  className = '',
}: {
  fillColor?: string;
  className?: string;
}) {
  // prettier-ignore
  return <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill={fillColor} className={className}><path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
}

export function ScheduleSVG({ fillColor = '#5f6368' }: { fillColor?: string }) {
  // prettier-ignore
  return <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill={fillColor}><path d="m627-287 45-45-159-160v-201h-60v225l174 181ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z" /></svg>
}

export function HomeSVG({ fillColor = '#5f6368' }: { fillColor?: string }) {
  // prettier-ignore
  return <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill={fillColor}><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
}

export function HomeFillSVG({ fillColor = '#5f6368' }: { fillColor?: string }) {
  // prettier-ignore
  return <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill={fillColor}><path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"/></svg>
}
export function PersonSVG({ fillColor = '#5f6368' }: { fillColor?: string }) {
  // prettier-ignore
  return <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill={fillColor}><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
}
export function TickSVG({ fillColor = '#5f6368' }: { fillColor?: string }) {
  // prettier-ignore
  return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={fillColor}><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
}

export function CrossSVG({ fillColor = '#5f6368' }: { fillColor?: string }) {
  // prettier-ignore
  return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={fillColor}><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
}

export function QuestionBoxSVG({
  fillColor = '#5f6368',
}: {
  fillColor?: string;
}) {
  // prettier-ignore
  return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={fillColor}><path d="M200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm560 0H600v-80h160v-160h80v160q0 33-23.5 56.5T760-120ZM120-760q0-33 23.5-56.5T200-840h160v80H200v160h-80v-160Zm720 0v160h-80v-160H600v-80h160q33 0 56.5 23.5T840-760ZM480-240q21 0 35.5-14.5T530-290q0-21-14.5-35.5T480-340q-21 0-35.5 14.5T430-290q0 21 14.5 35.5T480-240Zm-36-153h73q0-34 8-52t35-45q35-35 46.5-56.5T618-598q0-54-39-88t-99-34q-50 0-86 26t-52 74l66 27q7-26 26.5-42.5T480-652q29 0 46.5 15.5T544-595q0 20-9.5 37.5T502-521q-33 29-45.5 56T444-393Z"/></svg>
}
