<div class="day">
    <label class="day__header">
        <input class="invisible js-checkbox" type="checkbox" checked/>
        <span class="day__name js-name"></span>
        <div class="day__cal-count">
            <span class="js-cals"></span>
            <svg class="hidden js-warning" viewBox="0 0 22 20" width="22">
                <path fill-rule="evenodd" clip-rule="evenodd" d="m21.44 13.95-7-11.97a3.97 3.97 0 0 0-6.88 0l-7 11.98A4 4 0 0 0 3.97 20h14.04a4.01 4.01 0 0 0 3.43-6.05ZM2.28 14.97 9.29 2.98a1.98 1.98 0 0 1 3.42 0l7 11.99a2 2 0 0 1-1.7 3.03H3.97a2 2 0 0 1-1.7-3.03ZM11 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1-10h-2v7h2V6Z" fill="#FFB703"/>
            </svg>
        </div>
        <svg class="day__chevron" viewBox="0 0 16 9" width="16">
            <path fill-rule="evenodd" clip-rule="evenodd" d="m14.08.08 1.18 1.18L8 8.5.74 1.26 1.92.08 8 6.15 14.08.08Z" fill="#fff"/>
        </svg>
    </label>
    <div class="day__entries js-entries">
        <template>
            <x-entry/>
        </template>
    </div>
</div>
