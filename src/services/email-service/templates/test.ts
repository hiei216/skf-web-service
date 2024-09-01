export const testTemplate = `<mjml>
  <mj-body background-color="#efeeea" width="600px">
    <mj-section padding="20px 0px 0px 0px" border="none" direction="rtl" text-align="center" background-repeat="repeat" background-size="auto">
      <mj-column border="none" vertical-align="top" padding="0px 0px 0px 0px">
        <mj-text align="left" color="#000" container-background-color="#26577c" padding="10px 25px 10px 25px">
          <div style="text-align: center">
            <span style="font-size: xx-large; word-spacing: normal"><b>
                <font color="#ffffff">Biblické Verše</font>
              </b></span>
          </div>
        </mj-text>
        <mj-text align="left" font-size="20px" color="#F45E43" font-family="helvetica" container-background-color="#ebe4d1" padding="10px 25px 20px 25px"><b>
            <font color="#000000">Ahoj</font>
          </b>
          <b>{{firstName}}</b>,
          <div>
            <font color="#000000"><b>tvoj dnešný biblický verš je nasledovný:</b></font>
          </div>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-repeat="repeat" background-size="auto" border="none" direction="ltr" text-align="center" background-color="#ebe4d1" padding="20px 25px 20px 25px">
      <mj-column border="none" vertical-align="top" border-radius="10px" padding="0px 0px 0px 0px">
        <mj-text align="left" font-size="20px" color="#fff" font-family="helvetica" font-weight="600" container-background-color="#e55604" padding="20px 25px 20px 25px">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur urna leo, tristique ac pulvinar nec, bibendum sed ex. Cras dignissim, metus non dictum suscipit, lacus urna consequat lectus, sed consectetur ex orci id arcu. Maecenas sed lectus sit amet tortor porta luctus. Vestibulum euismod orci ac lectus molestie, ac varius diam finibus. Cras molestie nec dui eu fringilla. Ut sed felis fermentum, tempor sapien vel, suscipit orci. Donec et auctor lectus, at hendrerit ipsum."
          </div>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-repeat="repeat" background-size="auto" border="none" direction="ltr" text-align="center" background-color="#ebe4d1" padding="20px 25px 20px 25px">
      <mj-column border="none" vertical-align="top" border-radius="10px" padding="0px 0px 0px 0px">
        <mj-button align="center" background-color="#ffffff" color="#e55604" font-weight="700" border-radius="5px" line-height="120%" target="_blank" vertical-align="middle" border="solid #e55604" text-align="center" href="https://skf-personal-prayer-app.onrender.com/verse-of-day" container-background-color="#ebe4d1" padding="10px 25px 10px 25px">Vygenerovať ďalšie verše</mj-button>
      </mj-column>
    </mj-section>
    <mj-section background-repeat="repeat" background-size="auto" border="none" direction="ltr" text-align="center" background-color="#ebe4d1" padding="20px 25px 20px 25px">
      <mj-column border="none" vertical-align="top" border-radius="10px" padding="0px 0px 0px 0px">
        <mj-button align="center" background-color="#ffffff" color="#e55604" font-weight="700" border-radius="5px" line-height="120%" target="_blank" vertical-align="middle" border="solid #e55604" text-align="center" href="https://skf-personal-prayer-app.onrender.com/verse-history" container-background-color="#ebe4d1" padding="10px 25px 10px 25px">Pozrieť históriu veršov</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;
